import React from 'react'
import Navbar from './Navbar.jsx'
import "./styles/About.css"

//MAPA Y PLANOS DE LA EMPRESA

function AboutUs() {
  return (
    <div className='about-container'>
        <Navbar></Navbar>
        <div className='contentContainer'>


        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1408.1057129130304!2d-76.50085657622134!3d3.4171875079507017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1756574554212!5m2!1ses-419!2sco" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default AboutUs