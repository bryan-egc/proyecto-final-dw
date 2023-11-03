import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/header';
import GridProductos from './components/productos/productos';
import LogIn from './components/headerButtons/LogIn';
import SignIn from './components/headerButtons/SignIn';
import Footer from './components/footer/footer';
import Compra from './components/compra/compra';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('camisa');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleError = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      
        <Header onLoginClick={() => setLoggedIn(false)} onSignInClick={() => setLoggedIn(false)} />
        <Routes>
          <Route path="/productos" element={<GridProductos onError={handleError} />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout" element={<Compra />} />
        </Routes>
        
      <Footer />
    </Router>
  );
}

export default App;