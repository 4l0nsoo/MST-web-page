import {useEffect, useState} from 'react'
import "./styles/Slider.css"
import pc from "../assets/slider/pc.jpg"
import red from"../assets/slider/red.jpg"
import software from "../assets/slider/software.jpg"

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [{src:pc, alt:"PC"}, {src:red, alt:"RED"}, {src:software, alt:"SOFTWARE"}];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval); 
  }, [activeIndex, slides.length]);

  const navIndex = (index) => {
    setActiveIndex(index)
  }

  return (
    <div>
        <div className="imgSlider">
          {slides.map((content, index) => (
            
            <div key={index} className={`slide ${activeIndex === index ? "active" : ""}`}> <img src={content.src} alt={content.alt} /></div>


          ))}

            <div className="navigation">
              {slides.map((_,index) => (
                <div key={index} className={`btn ${activeIndex === index ? "active" : ""}`} onClick={() =>{navIndex(index)}}></div>
              ))}
                

            </div>
        </div>

    </div>
  )
}

export default Slider