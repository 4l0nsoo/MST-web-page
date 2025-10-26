import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./styles/Chatbot.css";

export function Chatbot() {
  const [expandido, setExpandido] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Animación de despliegue con GSAP
  useEffect(() => {
    if (expandido) {
      gsap.to(chatRef.current, {
        height: 400,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(chatRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [expandido]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error al comunicarse con el servidor" },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <button
        className={`chatbot-toggle ${expandido ? "close" : "open"}`}
        onClick={() => setExpandido((prev) => !prev)}
      >
        {expandido ? "✕" : "💬"}
      </button>

      <div className="chatbot-box" ref={chatRef}>
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <p
              key={idx}
              className={`chatbot-message ${
                msg.from === "user" ? "user" : "bot"
              }`}
            >
              <strong>{msg.from === "user" ? "Tú" : "Bot"}:</strong> {msg.text}
            </p>
          ))}
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
          />
          <button className="chatbot-send" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}