import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from "./footer";
import { useNavigate } from 'react-router-dom';

function Goods() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(""); // 추가: 정렬 방식 상태
  const navigate = useNavigate(); // navigate 함수 사용 준비

  useEffect(() => {
    // 로컬 스토리지에서 UserId 가져오기
    const storedUserId = localStorage.getItem('UserId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

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

  // 정렬 방식 변경 핸들러
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // 상품 디테일 페이지로 이동하는 함수
  const goToProductDetail = (productId) => {
    navigate(`/GoodsDetail/${productId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div>
        <h1>랭킹</h1>
        {/* 드롭다운 버튼 추가 */}
        <div>
          <select onChange={handleSortOrderChange}>
            <option value="">정렬 선택</option>
            <option value="내림차순">내림차순</option>
            <option value="오름차순">오름차순</option>
          </select>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {loading ? (
            <div>로딩중...</div>
          ) : (
            products.map((product) => (
              <div key={product.id} style={{ margin: "10px", textAlign: "center" }}>
                {/* 상품 디테일 페이지로 이동하는 함수 호출 */}
                <div onClick={() => goToProductDetail(product.id)}>
                  <img
                    src={product.url}
                    alt={product.name}
                    style={{ width: '200px', height: '350px', cursor: 'pointer' }}
                  />
                </div>
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
                {/* 상품 디테일 페이지로 이동하는 함수 호출 */}
                <div onClick={() => goToProductDetail(product.id)}>
                  <img
                    src={product.url}
                    alt={product.name}
                    style={{ width: '200px', height: '350px', cursor: 'pointer' }}
                  />
                </div>
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
