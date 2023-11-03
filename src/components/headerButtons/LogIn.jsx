import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Forms.sass';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CorreoElectronico: email,
          Clave: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.Token);
        navigate('/productos');
      } else {
        setErrorMessage(data.Mensaje);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="LogForm">
      <Form onSubmit={handleSubmit}>
        <Image src="../icons/LogInLogo.png" roundedCircle style={{ width: '30%', height: '30%' }}/>
        <br />
        <Form.Label>Log In</Form.Label>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Badge bg="danger">{errorMessage}</Badge>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Log In
        </Button>
        <br />
        <br />
        <Form.Text>Crea tu cuenta</Form.Text>
        <br />
        <Button variant="primary" onClick={handleSignInClick}>
          Sign In
        </Button>
      </Form>

    </div>
  );
}

export default Login;