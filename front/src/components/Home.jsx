import { Link } from 'react-router-dom'
import './styles/Home.css'
import { useState } from 'react'
import { Chatbot } from './Chatbot'

const Home = () => {
  const [activeTab, setActiveTab] = useState("Misión");
  // form state
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <div className="home-container">
        <section className="info-section">
          <nav className="sidebar">
            <ul>
              <Link to={"/aboutus"}><li>Conócenos</li></Link>
              <Link to={"/services"}><li>Servicios</li></Link>
              <Link to={"/products"}><li>Productos</li></Link>
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
          <form onSubmit={async (e) => {
            e.preventDefault();
            setStatusMessage("");

            // basic validation
            if (!nombre || !email || !mensaje) {
              setStatusMessage('Por favor complete los campos Nombre, Correo y Mensaje.');
              return;
            }

            setSubmitting(true);

            try {
              const base = import.meta.env.VITE_API_URL || 'http://localhost:3000';
              const res = await fetch(`${base}/api/mail/send-mail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, telefono, mensaje }),
              });

              const data = await res.json();

              if (res.ok) {
                setStatusMessage(data.message || 'Solicitud enviada correctamente.');
                // clear form
                setNombre('');
                setEmail('');
                setTelefono('');
                setMensaje('');
              } else {
                setStatusMessage(data.message || 'Error al enviar la solicitud.');
              }
            } catch (err) {
              console.error(err);
              setStatusMessage('Error de red. Intente nuevamente.');
            } finally {
              setSubmitting(false);
            }
          }}>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo" />
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="text" placeholder="Teléfono (opcional)" />
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows="4" placeholder="Mensaje"></textarea>
            <button disabled={submitting} type="submit">{submitting ? 'Enviando...' : 'Enviar'}</button>
            {statusMessage && <p className="form-status">{statusMessage}</p>}
          </form>
        </section>
      </div>
      <Chatbot/>
    </>
  )
}

export default Home
