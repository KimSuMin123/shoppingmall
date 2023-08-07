import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../img/Logo.PNG";

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // 검색어를 담을 상태 변수

  const handleSearch = () => {
    // 검색 결과 페이지를 "/ProductDetail"로 가정하고 검색어를 쿼리 파라미터로 전달합니다.
    navigate(`/ProductDetail?q=${encodeURIComponent(searchQuery)}`);
  };
  const handlemain = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handlegoods = () => {
    navigate("/goods");
  };

  const handlemypage = () => {
    navigate("/mypage");
  };
  const handleCategory = () => {
    navigate("/Category");
  };
  
  const handleShoppingBasket = () => {
    navigate("/ShoppingBasket");
  };

  const handleLikeList = () => {
    navigate("/LikeList");
  };

  const handleLogout = () => {
    // 로그아웃 시 토큰 삭제
    localStorage.removeItem("token");
    localStorage.removeItem("UserId");
    navigate("/");
  };

  const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
  const UserId = localStorage.getItem("UserId");

  return (
    <div className="Headermodel">
      <img
        id="Headerlogo"
        onClick={handlemain}
        src={Logo}
        alt="Logo"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="검색"
      />
      <button onClick={handleSearch}>검색</button>
      <button id="Headerbuttonone" onClick={handlegoods}>
        상품
      </button>
      <button id="Headerbuttontwo" onClick={handleCategory}>
        카테고리 검색
      </button>
      <button id="Headerbuttontwo" onClick={handlemypage}>
        마이페이지
      </button>
      <button id="Headerbuttontwo" onClick={handleShoppingBasket}>
        장바구니
      </button>
      <button id="Headerbuttontwo" onClick={handleLikeList}>
        관심리스트
      </button>
      {token ? (
        <div id="SLogin">
          <button id="Headerbuttonthree" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <button id="Headerbuttonthree" onClick={handleLogin}>
          로그인
        </button>
      )}
    </div>
  );
}

export default Header;

