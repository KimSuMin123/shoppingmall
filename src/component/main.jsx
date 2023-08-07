import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import TopBanner from "../img/TopBanner.PNG";
import SecondBanner from "../img/SecondBanner.PNG";
import Header from "./header";

function Main() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        let url = 'http://43.202.83.222:8080/product/listProduct';
        if (sortOrder) {
          url = `http://43.202.83.222:8080/product/priceSort?sort=${sortOrder}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();

    // Get UserId from localStorage
    const storedUserId = localStorage.getItem('UserId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [sortOrder]);

  const handleTopBannerClick = () => {
    navigate('/EventPage');
  };
  const handleSecondBannerClick = () => {
    navigate('/EventPage');
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!products || products.length === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <div>
        <Header />
        <img
          id="TopBanner"
          src={TopBanner}
          alt="TopBanner"
          onClick={handleTopBannerClick}
        />
        <h1>새로운 상품</h1>
        <div>
          <select onChange={handleSortOrderChange}>
            <option value="">정렬 선택</option>
            <option value="내림차순">내림차순</option>
            <option value="오름차순">오름차순</option>
          </select>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <div key={product.id} style={{ margin: "10px", textAlign: "center" }}>
              <img
                src={product.url}
                alt={product.name}
                style={{ width: '200px', height: '350px' }}
              />
              <div>{product.productName}</div>
              <div>{product.price}원</div>
            </div>
          ))}
        </div>
        <img
          id="SecondBanner"
          src={SecondBanner}
          alt="SecondBanner"
          onClick={handleSecondBannerClick}
        />
        <h1>{userId}님의 추천 상품</h1>
      </div>
    </div>
  );
}

export default Main;
