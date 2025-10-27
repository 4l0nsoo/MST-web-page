import {useState} from 'react'
import Navbar from './Navbar.jsx'
import "./styles/About.css"
import { aboutStart } from '../assets/servicesimport.js'
import Footer from './Footer.jsx'
import {tecnicos} from '../assets/servicesimport.js'

//MAPA Y PLANOS DE LA EMPRESA

function AboutUs() {
    const [index, setIndex] = useState(0);

  const team = [
    { title: "Relaciones Internacionales", src: tecnicos[5] },
    { title: "Finanzas", src: tecnicos[1] },
    { title: "Marketing", src: tecnicos[6] },
    { title: "Recursos Humanos", src: tecnicos[2] },
    { title: "Mantenimiento", src: tecnicos[0] },
    { title: "Redes", src: tecnicos[4] },
    { title: "Arduino", src: tecnicos[3] },

    
  ];

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % team.length);
  };

  return (
    <>
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
        <section className="team-section">
      <h2 className="team-main-title">Conoce a nuestro equipo</h2>
      <h3 className="team-dynamic-title">{team[index].title}</h3>

      <div className="team-slider-container">
        <button className="arrow left" onClick={prevSlide}>
        </button>

        <div
          className="team-slider"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {team.map((member, i) => (
            <div className="team-slide" key={i}>
              <img src={member.src} alt={member.title} />
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={nextSlide}>
        </button>
      </div>
    </section>

        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1408.1057129130304!2d-76.50085657622134!3d3.4171875079507017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1756574554212!5m2!1ses-419!2sco" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

    </div>
            <Footer></Footer>
    </>
  )
}

export default AboutUs