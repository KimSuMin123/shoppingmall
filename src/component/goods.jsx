import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import TopBanner from "../img/TopBanner.PNG";
import SecondBanner from "../img/SecondBanner.PNG";
import Header from "./header";
import Footer from "./footer";

function Goods() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 UserId 가져오기
    const storedUserId = localStorage.getItem('UserId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // 상품 데이터 가져오기
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://43.202.83.222:8080/product/priceSort');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("상품 데이터를 불러오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div>
        <h1>카테고리</h1>
        <p>옷 셔츠 바지</p>
      </div>
      <div>
        <h1>랭킹</h1>
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
      </div>
      <div>
        <h1>{userId}님을 위한 추천 상품</h1>
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
      </div>
      <div style={{ flexGrow: 1 }}>
        <h1>상품</h1>
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
      </div>
      <Footer />
    </div>
  );
}

export default Goods;

