// Products.jsx (rfce)
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Product1 from "../assets/slider/product1.jpeg"; 
import Product2 from "../assets/fotos-mantenimiento/arduino1.png";
import Product3 from "../assets/fotos-mantenimiento/arduino2.png";
import "./styles/Products.css";

function Products() {
  const [index, setIndex] = useState(0);

  const products = [{src:Product1,
    paragraph:'El proyecto consiste en diseñar una lámpara que enciende y apaga mediante aplausos utilizando un sensor de sonido',href:'https://drive.google.com/file/d/1tAylKoeJDx5bzW1iwzl61EtnVh3oAc9t/view'},
     {src:Product2, paragraph:"Este consiste en crear un producto que ayude a las personas  a saber el nivel de humedad en sus plantas, es perfecto para saber si tus plantas estan completamente hidratadas ya sea en casa como remotamente.​", href:"https://4l0nsoo.github.io/luna/"},
      {src:Product3}];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="products-container">
      <button className="nav-button left" onClick={prevSlide} aria-label="Anterior">
        &#10094;
      </button>
      <div className="slider" style={{ transform: `translateX(-${index * 100}vw)` }}>
        {products.map((p, i) => (
  <div className="product-slide" key={i}>
    <div className="product-inner">
      <div className="left-box">
        <div className="left-top">
          <h2>Producto {i + 1}</h2>
          <p>
            {p.paragraph || "Descripción no disponible"}
          </p>
        </div>
        <div className="left-bottom">
         <a href={p.href}><button>Documentacion</button></a>
        </div>
      </div>

      <div className="right-image">
        {p.src ? <img src={p.src} alt={`Producto ${i + 1}`} /> : <div className="placeholder">Sin imagen</div>}
      </div>
    </div>
  </div>
))}

      </div>

      <button className="nav-button right" onClick={nextSlide} aria-label="Siguiente">
        &#10095;
      </button>
    </div>
    <Footer></Footer>
    </>
  );
}

export default Products;