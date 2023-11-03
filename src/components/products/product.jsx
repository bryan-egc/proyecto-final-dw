import React from "react";
import "./product.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Producto = ({producto}) =>{
    const imgPath = producto.Imagen;

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/carrito/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Token': `${token}`
                },
                body: JSON.stringify({
                    ProductoID: producto._id,
                    Cantidad: 1
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log(data);
            } else {
                console.error(data.Mensaje);
                console.log(producto)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imgPath} />
            <Card.Body>
                <Card.Title>{producto.Nombre}</Card.Title>
                <Card.Link>{producto.Precio}</Card.Link>
                <Card.Text>
                    {producto.Descripcion}
                </Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>Añadir</Button>
            </Card.Body>
            </Card>
        </>

    );
} 

export default Producto;