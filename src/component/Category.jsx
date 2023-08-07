import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import TopBanner from "../img/TopBanner.PNG";
import SecondBanner from "../img/SecondBanner.PNG";
import Header from "./header";
import Footer from "./footer";

function  Category() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); // 추가: 정렬 방식 상태

  useEffect(() => {

    // 상품 데이터 가져오기
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
        console.error("상품 데이터를 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOrder]);

  // 정렬 방식 변경 핸들러 (기존 코드 유지)

  // 카테고리 변경 핸들러
  const handleCategoryChange = async (category) => {
    try {
      const response = await axios.get(`http://43.202.83.222:8080/product/searchCategory?category=${encodeURIComponent(category)}`);
      setProducts(response.data);
    } catch (error) {
      console.error("상품 데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div>
      <Header/>
        <h1>카테고리</h1>
        <button onClick={() => handleCategoryChange("상의")}>상의</button>
        <button onClick={() => handleCategoryChange("아우터")}>아우터</button>
        <button onClick={() => handleCategoryChange("하의")}>하의</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {loading ? (
          <div>로딩중...</div>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ margin: "10px", textAlign: "center" }}>
              <img
                src={product.url}
                alt={product.name}
                style={{ width: '200px', height: '350px' }}
              />
              <div>{product.productName}</div>
              <div>{product.price}원</div>
            </div>
          ))
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default  Category;
