import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import { useNavigate } from 'react-router-dom';

const ShoppingBasket = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('UserId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://43.202.83.222:8080/cart/listByUserId?uId=${userId}`, {
          headers: {
            'X-AUTH-TOKEN': token
          }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token && userId) {
      fetchCartItems();
    }
  }, [token, userId]);

  const handleCheckout = () => {
    // Add logic for checkout here
  };

  return (
    <div>
      <Header />
      <h1>장바구니</h1>
      {cartItems.length > 0 ? (
        <div>
          <table>
            <tbody className="card-container">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img id="ingredientImg" src={item.url} width="50px" height="50px" alt="ingredient" />
                  </td>
                  <td id="ingredientTxt">{item.productName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCheckout}>결제하기</button>
        </div>
      ) : (
        <p>장바구니가 비어 있습니다.</p>
      )}
    </div>
  );
};

export default ShoppingBasket;
