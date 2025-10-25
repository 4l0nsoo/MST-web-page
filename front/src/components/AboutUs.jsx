import React from 'react'
import Navbar from './Navbar.jsx'
import "./styles/About.css"
import { aboutStart } from '../assets/servicesimport.js'

//MAPA Y PLANOS DE LA EMPRESA

function AboutUs() {
  return (
    <div className='about-container'>
        <Navbar></Navbar>
        <div className='contentContainer'>
        <div className='imgCont'>
          <img src={aboutStart[0]} alt="" />
          <img src={aboutStart[1]} alt="" />
        </div>
        <section className="values" aria-labelledby="valores-title">
    <h1 id="valores-title">Nuestros valores</h1>
    <ol>
      <li>
        <h2>1. Profesionalismo</h2>
        <p>Es clave para una buena ética, conducta y habilidades eficientes que permitan representar a la empresa de manera positiva y alcanzar nuestros objetivos.</p>
      </li>
      <li>
        <h2>2. Creatividad</h2>
        <p>Nos impulsa la innovación y la capacidad de generar ideas nuevas y originales para resolver problemas y mejorar los procesos internos.</p>
      </li>
      <li>
        <h2>3. Solidaridad</h2>
        <p>Implica apoyo mutuo, colaboración y respeto entre los trabajadores dentro de nuestra empresa.</p>
      </li>
      <li>
        <h2>4. Respeto</h2>
        <p>Representa la consideración hacia otras personas y el compromiso de brindar el mejor trato tanto a empleados como a clientes.</p>
      </li>
    </ol>
  </section>

    <div className='imgPlano'>
      <h1>Plano de la empresa</h1>
      <img src={aboutStart[2]} alt="" />
    </div>

        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1408.1057129130304!2d-76.50085657622134!3d3.4171875079507017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1756574554212!5m2!1ses-419!2sco" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default AboutUs