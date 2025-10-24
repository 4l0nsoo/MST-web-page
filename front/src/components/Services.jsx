import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import "./styles/Services.css"
import { mantenimiento, redes, arduino, tecnicos } from '../assets/servicesimport.js'

function Services() {

const [expandido, setExpandido] = useState(-1)
const cont1 = useRef(null)
const cont2 = useRef(null)
const cont3 = useRef(null)

const handleClick = (e, ref, index) => {

  if (expandido === index) {
    return;
  }

   [cont1, cont2, cont3].forEach((c) => {
    if (c.current) {
      const oldRipple = c.current.querySelector(".ripple");
      if (oldRipple) oldRipple.remove();
    }
  });

    const box = ref.current;
    const rect = box.getBoundingClientRect();

    // crear span
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    // posición del click dentro de la caja
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    box.appendChild(ripple);

    // calcular escala para cubrir todo
    const maxDim = Math.max(rect.width, rect.height);
    const finalScale = (maxDim * 2) /10;

    // animación
    gsap.to(ripple, {
      scale: finalScale,
      duration: 0.6,
      ease: "power1.inOut",
      
    });

    setExpandido(index)
  }

  return (
    <div >
        <Navbar></Navbar>
    <div className='ServicesCont' >
      <div ref={cont1} className={`service-container ${expandido === 0 ? "expandida": "highlight"}`} onClick={(e) => handleClick(e, cont1, 0)}>
        <h1>Mantenimiento</h1>
        
          <p>En nuestro servicio de mantenimiento de equipos nos encargamos de diagnosticar, reparar y optimizar el rendimiento de sus dispositivos. Trabajamos con tecnología de última generación para garantizar soluciones rápidas y confiables, ya sea en equipos de cómputo, hardware especializado o dispositivos electrónicos. Nuestro compromiso es prolongar la vida útil de sus equipos y asegurar que funcionen con la máxima eficiencia.</p>
          <div className='imagesMant'>
            <img src={mantenimiento[0]} alt="hola" />
            <img src={mantenimiento[1]} alt="hola" />
            <img src={mantenimiento[2]} alt="hola" />
          </div>
          <h2>Estado de mi Equipo</h2>
          <p>Dejó un equipo en nuestrar manos y quiere conocer su estado? <br />Consultelo ahora!</p>
          <div>  
            <form action="" className='Identify-form'>
              <input type="text" placeholder='Nombres y Apellidos'/>
              <input type="text" placeholder='Numero de Referencia' />
              <button>Buscar</button>
            </form>
            <div className='employees'>
              <img src={tecnicos[0]} alt="" />
            </div>
          </div>
          <div></div>
        
      </div>
      <div ref={cont2} className={`service-container ${expandido === 1 ? "expandida": ""}`} onClick={(e) => handleClick(e, cont2, 1)}>
        <h1>Redes</h1>
        <p>Nuestro equipo de redes ofrece soluciones integrales en telecomunicaciones, desde la instalación de cableado estructurado hasta la configuración de equipos de conectividad para empresas y hogares.</p>
        <div className='imagesRed'>
            <img src={redes[0]} alt="hola" />
            <img src={redes[1]} alt="hola" />
          </div>
      </div>
      <div ref={cont3} className={`service-container ${expandido === 2 ? "expandida": ""}`} onClick={(e) => handleClick(e, cont3, 2)}>
        <h1>Arduino</h1>
        <p>Ofrecemos servicios especializados en proyectos con Arduino, desde el diseño y desarrollo de prototipos hasta la programación y optimización de sistemas embebidos para diversas aplicaciones tecnológicas.</p>
          <div className='imagesArduino'>
            <img src={arduino[0]} alt="hola" />
            <img src={arduino[1]} alt="hola" />
          </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  )
}

export default Services