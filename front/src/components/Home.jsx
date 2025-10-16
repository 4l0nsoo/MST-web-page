import { Link } from 'react-router-dom'
import './styles/Home.css'
import { useState } from 'react'

const Home = () => {
  const [activeTab, setActiveTab] = useState("Misión");

  return (
    <>
      <div className="home-container">
        <section className="info-section">
          <nav className="sidebar">
            <ul>
              <li><Link to={"/aboutus"}>Conócenos</Link></li>
              <li><Link to={"/services"}>Servicios</Link></li>
              <li><Link to={"/products"}>Productos</Link></li>
            </ul>
          </nav>

          <div className="info-tabs-container">
            <div className="info-tabs">
              <span
                onClick={() => setActiveTab("Misión")}
                className={activeTab === "Misión" ? "active" : ""}
              >
                Misión
              </span>

              <span
                onClick={() => setActiveTab("Visión")}
                className={activeTab === "Visión" ? "active" : ""}
              >
                Visión
              </span>

              <span
                onClick={() => setActiveTab("Historia")}
                className={activeTab === "Historia" ? "active" : ""}
              >
                Historia
              </span>
            </div>
            <hr />

            {/* Contenido dinámico */}
            {activeTab === "Misión" && (
              <p className="info-text">
                En MST (Mantenimiento + Soluciones Tecnológicas) nos dedicamos a proporcionar soluciones integrales
                en mantenimiento preventivo, predictivo y correctivo para equipos de cómputo, así como a la
                implementación de redes informáticas y diseños de productos tecnológicos.
                Nuestro propósito es garantizar la eficiencia, seguridad y sostenibilidad de los sistemas
                tecnológicos de nuestros clientes, a través de un servicio de alta calidad, adaptado a las
                necesidades específicas de cada usuario. Nos comprometemos a ser un aliado estratégico, impulsando
                la continuidad operativa y el desarrollo tecnológico de quienes confían en nosotros.

              </p>
            )}

            {activeTab === "Visión" && (
              <p className="info-text">
                En el año 2030, MST (Mantenimiento + Soluciones Tecnológicas) se proyecta como la empresa líder en el Valle
                del Cauca en la prestación de soluciones integrales de mantenimiento a equipos de cómputo, implementación de
                redes informáticas y diseño de productos tecnológicos.
                Seremos reconocidos por nuestra innovación, confiabilidad y compromiso con la excelencia operativa,
                asegurando la continuidad, eficiencia y seguridad de los sistemas tecnológicos de cada uno de nuestros clientes.

              </p>
            )}

            {activeTab === "Historia" && (
              <p className="info-text">
                En el corazón tecnológico de Cali, donde la innovación palpita y el futuro se construye con bits
                y bytes, nació MST (Mantenimiento + Soluciones Tecnológicas) en 2018. Un sueño compartido por ingenieros
                visionarios, impulsados por la convicción de que la tecnología debe ser accesible, confiable y transformadora.
                Vieron la necesidad de un soporte informático que fuera más allá de la reparación, y la chispa creativa que
                reside en la electrónica programable como una herramienta para materializar ideas audaces.

                Desde un modesto taller, MST se propuso ser el nexo entre la complejidad tecnológica y la simplicidad de soluciones
                efectivas. Con dedicación y una profunda pasión por lo que hacen, rápidamente se ganaron la confianza de empresas y
                particulares en Cali, resolviendo desafíos informáticos con experiencia y un trato cercano.
              </p>
            )}
          </div>
        </section>

        <section className="service-form">
          <h2>Solicitar servicio</h2>
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Correo" />
            <input type="text" placeholder="Asunto / Problemática" />
            <textarea rows="4" placeholder="Mensaje"></textarea>
            <button type="submit">Enviar</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default Home
