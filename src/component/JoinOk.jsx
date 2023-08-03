import { useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./header";

function JoinOk() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/Login");
  };
  const userName = window.localStorage.getItem("UserId");
  return (
    <div>
      <Header/>
      <div id = "Joinokall">
        {userName}님<br/> 회원가입을 축하드립니다.<br/>
        <button id = "JoinButton" onClick={handleLogin}>로그인 하러 가기</button>
      </div>
    </div>
  );
}
export default JoinOk;