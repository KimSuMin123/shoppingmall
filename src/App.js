import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import React from 'react';
import '../src/App.css';
import Login from "./component/Login";
import Main from "./component/main";
import Goods from "./component/goods";
import MyPage from "./component/myPage";
import ShoppingBasket from "./component/shoppingBasket";
import Likelist from "./component/likelist";
import Join from "./component/Join";
import JoinOk from "./component/JoinOk";
import EventPage from "./component/eventPage";
import Footer from "./component/footer";
import ProductDetail from "./component/productDetail";
import Category from "./component/Category";

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Main/>}/>
          <Route path = "/Login" element = {<Login/>}/>
          <Route path = "/goods" element = {<Goods/>}/>
          <Route path = "/mypage" element = {<MyPage/>}/>
          <Route path = "/ShoppingBasket" element = {<ShoppingBasket/>}/>
          <Route path = "/LikeList" element = {<Likelist/>}/>
          <Route path = "/Join" element ={<Join/>}/>
          <Route path = "/JoinOk" element = {<JoinOk/>}/>
          <Route path="/EventPage" element = {<EventPage/>}/>
          <Route path="/Footer" element = {<Footer/>}/>
          <Route path="/ProductDetail" element ={<ProductDetail/>}/>
          <Route path="/Category" element = {<Category/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

