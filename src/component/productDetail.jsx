import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from 'react';
import Header from "./header";

function ProductDetail() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 검색 쿼리를 기반으로 상품을 가져옵니다.
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://43.202.83.222:8080/product/searchProduct?productName=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <Header />
      <h1>"{searchQuery}"에 대한 검색 결과</h1>
      {loading ? (
        <div>로딩중...</div>
      ) : searchResults.length === 0 ? (
        <div>상품이 없습니다.</div>
      ) : (
        <div>
          {searchResults.map((product) => (
            <div key={product.id}>
              <h2>{product.productName}</h2>
              <img src={product.url} alt={product.name} />
              <p>카테고리 : {product.category}</p> <br/>
              <p>가격 : {product.price}원</p><br/>
              <p>스펙 : {product.spec}</p><br/>
              <p>정보 : {product.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
