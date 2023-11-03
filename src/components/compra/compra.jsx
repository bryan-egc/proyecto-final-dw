import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

function Checkout() {
    const [showCart, setShowCart] = useState(false);
    const [cartData, setCartData] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      
      const fetchCartItems = async () => {
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
            console.log(data);
            setTotalPrice(data.Total);
          } else {
            setErrorMessage(data.Mensaje);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchCartItems();
    }, []);
  
    const handleConfirmClick = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/compra', {
          method: 'POST',
          headers: {
            'Token': `${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data.Mensaje); 
          setconfirmMessage(data.Mensaje);
        } else {
          setErrorMessage(data.Mensaje);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleClickInicio = () => {
      navigate('/productos');
    };
  
    return (
      <Container>
        <Row>
          <Col>
          <Image src="../icons/carts.png"  style={{ width: '10%', height: '15%' }}/>
          <br />
            <hr />
            <h2>Orden</h2>
            {true && (
                          
                          <div className="cart-dropdown">
                            <ul className="cart-items">
                              {cartData && cartData.Productos.map((item, index) => (
                                <li key={index}>
                                  {item.ProductoID.Nombre}  -  ${item.ProductoID.Precio} x {item.Cantidad}
                                </li>
                              ))}
                            </ul>
                            <div className="cart-total">
                              Total: ${cartData ? cartData.Total : 0}
                            </div>
                          </div>
                        
                      )}
            <hr />
            <h2>Información de pago</h2>
            <Form>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Número de tarjeta</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" value={cardNumber} />
              </Form.Group>
              <Form.Group controlId="formCardName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Enter cardholder name" value={cardName}  />
              </Form.Group>
              <Form.Group controlId="formCardExpiration">
                <Form.Label>Fecha de Expieracion</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" value={cardExpiration}/>
              </Form.Group>
              <Form.Group controlId="formCardCvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="Enter CVV" />
              </Form.Group>
              <br />
              <Badge bg="success">{errorMessage}</Badge>
              <Badge bg="success">{confirmMessage}</Badge>
              <br/>
              <br />
              <Button variant="primary" onClick={handleConfirmClick}>
                Confirmar
              </Button>
              <br/>
              <br />
              <Button variant="primary" onClick={handleClickInicio}>
                Seguir comprando
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Checkout;