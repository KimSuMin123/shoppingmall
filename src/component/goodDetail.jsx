import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";

function GoodsDetail() {
  const { productName } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`
        http://43.202.83.222:8080/product/searchProduct?productName=${productName}`);
        setProductDetail(response.data);
      } catch (error) {
        console.error("상품 디테일을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchProductDetail();
  }, [productName]);

  return (
    <div>
      <Header />
      <h1>상품 디테일 페이지</h1>
      <div>
        <img src={productDetail.url} alt={productDetail.name} style={{ width: '300px', height: '450px' }} />
        <div>{productDetail.productName}</div>
        <div>{productDetail.price}원</div>
      </div>
      <Footer />
    </div>
  );
}

export default  GoodsDetail;
