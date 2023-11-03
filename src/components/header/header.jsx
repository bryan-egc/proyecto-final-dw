import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ShoppingCartIcon from '../headerButtons/ShoppingIcon';
import './header.sass';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Image from 'react-bootstrap/Image';


const Header = ({ onSelect, onLoginClick, onSignInClick }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/carrito', {
          headers: {
            'Token': `${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setCartData(data);
        } else {
          setErrorMessage(data.Mensaje);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartData();
  }, []);

  const handleCategoryClick = (category) => {
    onSelect(category);
  };

  const handleCartClick = async () => {
    setShowCart(!showCart);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/carrito', {
        headers: {
          'Token': `${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCartData(data);
      } else {
        setErrorMessage(data.Mensaje);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckOutClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/checkout');
    } else {
      navigate('/');
    }
  };

  const handleClickInicio = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/productos');
    } else {
      navigate('/');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Image src="../icons/logo.png" roundedCircle style={{ width: '2%', height: '2%' }}/>
        <Navbar.Brand onClick={handleClickInicio}>TecnoTendencia</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>

            {['bottom'].map((placement) => (
              <OverlayTrigger
                trigger="click"
                key={placement}
                placement={placement}
                overlay={
                  <Popover id={`popover-positioned-${placement}`}>
                    <Popover.Header as="h3">Carrito</Popover.Header>
                    <Popover.Body>
                      {showCart && (
                        <div className="cart-container">
                          <div className="cart-dropdown">
                            <ul className="cart-items">
                              {cartData && cartData.Productos.map((item, index) => (
                                <li key={index}>
                                  {item.ProductoID.Nombre} - ${item.ProductoID.Precio} x {item.Cantidad}
                                </li>
                              ))}
                            </ul>
                            <div className="cart-total">
                              Total: ${cartData ? cartData.Total : 0}
                            </div>
                            <button className="checkout-button" onClick={handleCheckOutClick}>Checkout</button>
                          </div>
                        </div>
                      )}
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button variant="outline-danger" onClick={handleCartClick}>
                  <ShoppingCartIcon />
                  {cartData && cartData.Productos.length > 0 && <span className="cart-count">{cartData.Productos.length}</span>}
                </Button>
              </OverlayTrigger>
            ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;