import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
function SignupForm() {
  const navigate = useNavigate();
  const [DPI, setDPI] = useState('');
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [Clave, setClave] = useState('');
  const [ValidacionClave, setValidacionClave] = useState('');
  const [DireccionEntrega, setDireccionEntrega] = useState('');
  const [NIT, setNIT] = useState('');
  const [NúmeroTelefonico, setNúmeroTelefonico] = useState('');
  const [CorreoElectronico, setCorreoElectronico] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      DPI,
      Nombres,
      Apellidos,
      FechaNacimiento,
      Clave,
      ValidacionClave,
      DireccionEntrega,
      NIT,
      NúmeroTelefonico,
      CorreoElectronico,
      Rol: 'user', // set the default value for Rol
    };
    try {
      const response = await fetch('http://localhost:3000/api/registro/123', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data); // log the response from the server
      } else {
        setErrorMessage(data.Mensaje);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogInClick = () => {
    navigate('/');
  };
  return (
    <div className="LogForm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicDPI">
        <Image src="../icons/LogInLogo.png" roundedCircle style={{ width: '30%', height: '30%' }}/>
        <br />
          <Form.Label>Registro</Form.Label>
          <Form.Control type="text" placeholder="DPI" value={DPI} onChange={(e) => setDPI(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicNombres">
          <Form.Control type="text" placeholder="Nombre" value={Nombres} onChange={(e) => setNombres(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicApellidos">
          <Form.Control type="text" placeholder="Apellido" value={Apellidos} onChange={(e) => setApellidos(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicFechaNacimiento">
          <Form.Text>Fecha De Nacimiento</Form.Text>
          <Form.Control type="date" placeholder="Enter fecha de nacimiento" value={FechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicClave">
          <Form.Control type="password" placeholder="Contraseña" value={Clave} onChange={(e) => setClave(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicValidacionClave">
          <Form.Control type="password" placeholder="Confirme su contraseña" value={ValidacionClave} onChange={(e) => setValidacionClave(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicDireccionEntrega">
          <Form.Control type="text" placeholder="Dirección de entrega" value={DireccionEntrega} onChange={(e) => setDireccionEntrega(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicNIT">
          <Form.Control type="number" placeholder="NIT" value={NIT} onChange={(e) => setNIT(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicNúmeroTelefonico">
          <Form.Control type="number" placeholder="Número telefónico" value={NúmeroTelefonico} onChange={(e) => setNúmeroTelefonico(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicCorreoElectronico">
          <Form.Control type="email" placeholder="Correo electrónico" value={CorreoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
        </Form.Group>
        <Badge bg="danger">{errorMessage}</Badge>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <br />
        <br />
        <Form.Text>Inicia sesión</Form.Text>
        <br />
        <Button variant="primary" onClick={handleLogInClick}>
          LogIn
        </Button>
      </Form>
    </div>
  );
}

export default SignupForm;