import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={columnStyle}>
          <h3>회사 정보</h3>
          <p>회사명: Dealim Shopping Mall</p>
          <p>주소: 서울특별시 강남구</p>
          <p>전화번호: 02-1234-5678</p>
        </div>
        <div style={columnStyle}>
          <h3>고객센터</h3>
          <p>고객 문의: help@example.com</p>
          <p>배송문의: delivery@example.com</p>
        </div>
        <div style={columnStyle}>
          <h3>주요 링크</h3>
          <ul style={linkListStyle}>
            <li>홈</li>
            <li>상품 목록</li>
            <li>회사 소개</li>
            <li>연락처</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  marginTop: '50px',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const columnStyle = {
  flex: '1',
};

const linkListStyle = {
  listStyle: 'none',
  padding: '0',
};

export default Footer;
