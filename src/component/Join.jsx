import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './header';

const Join = () => {
  const [uid, setuId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleJoinOk = () => {
    navigate("/JoinOk");
  };

  const handleJoin = () => {
    const userData = {
      id: uid,
      phone,
      password,
      name,
      email,
    //   role: "user"
    };

    const queryString = Object.keys(userData)
      .map(key => `${key}=${encodeURIComponent(userData[key])}`)
      .join('&');

    const url = `http://43.202.83.222:8080/sign-api/user-sign-up?${queryString}`;
    console.log({queryString})
    axios.post(url)
      .then(response => {
        // 회원가입 성공 처리
        console.log('회원가입 성공:', response.data);
        localStorage.setItem('UserId', uid);
        handleJoinOk();
      })
      .catch(error => {
        // 회원가입 실패 처리
        console.error('회원가입 실패:', error.response);
        if (error.response.status === 401) {
          setErrorMessage('이미 같은 아이디를 가진 유저가 있습니다.');
          // 인증 오류 처리 로직 추가
        } else {
          setErrorMessage('이미 같은 아이디를 가진 유저가 있습니다.');
          // 기타 서버 오류 처리 로직 추가
        }
      });
  };

  return (
    <div>
      <Header />
      <div id="JoinAll">
        <h2 id="Jointitle">회원가입</h2>
        {errorMessage && <p>{errorMessage}</p>}
        아이디 : <br />
        <input
          type="text"
          id="JoinId"
          placeholder="아이디"
          value={uid}
          onChange={e => setuId(e.target.value)}
        /><br />
        전화번호 : <br />
        <input
          type="text"
          id="JoinPhone"
          placeholder="전화번호"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        /><br />
        비밀번호 : <br />
        <input
          type="password"
          id="Joinpw"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        이름 : <br />
        <input
          type="text"
          id="Joinname"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
        /><br />
        이메일 : <br />
        <input
          type="email"
          id="Joinemail"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <button id="JoinButton" onClick={handleJoin}>가입하기</button>
      </div>
    </div>
  );
};

export default Join;
