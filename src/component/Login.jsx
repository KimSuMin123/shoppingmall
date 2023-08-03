import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './header';


const Join = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleJoin = () => {
    navigate("/Join");
  };
  const handleLogin = () => {
    const queryString = `http://43.202.83.222:8080/sign-api/user-sign-in?id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`;

    axios.post(queryString)
      .then(response => {
        // 로그인 성공 처리
        console.log('로그인 성공:', response.data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('UserId', id);
        navigate("/");
      })
      .catch(error => {
        // 로그인 실패 처리
        console.error('로그인 실패:', error.response);
        setErrorMessage('아이디 또는 비밀번호가 잘못되었습니다.');
         
      });
  };

  return (
    <div>
      <Header/>
      <div id= "LoginAll">
      <h2 id = "Logintitle">로그인</h2>
      {errorMessage && <p>{errorMessage}</p>}
      아이디:<br/>
      <input
        type="text"
        id = "LoginId"
        placeholder="아이디"
        value={id}
        onChange={e => setId(e.target.value)}
      /><br/>
      비밀번호:
      <input
        type="password"
        id = "Loginpw"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleLogin} id = "SignupButton">로그인</button>
      <button onClick={handleJoin} id = "SignupButton">회원가입</button>
    </div>
    </div>
  );
};

export default Join;
