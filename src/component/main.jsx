import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import TopBanner from "../img/TopBanner.PNG";
import SecondBanner from "../img/SecondBanner.PNG";
import Header from "./header";
import Footer from "./footer";

function Main() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://43.202.83.222:8080/product/priceSort');
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
  }, []);

  const handleTopBannerClick = () => {
    navigate('/EventPage');
  };
  const handleSecondBannerClick = () => {
    navigate('/EventPage');
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
        <h1>{userId}님을 위한 추천 상품</h1>
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
        <Footer/>
      </div>
    </div>
  );
}

export default Main;
