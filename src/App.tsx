import { useState, useEffect } from "react";
import "./App.css";
import History from "./History";
import ChihuahuaHead from "./ChihuahuaHead";
import Modal from "./Modal";

const BUTTONS = [
  "(", ")", "⌫", "C",
  "%", "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "+", "=",
];

const isMobile = () => window.innerWidth <= 700;

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const mobile = isMobile();

  // Charger l'historique depuis le localStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem("chihuahua-history");
    if (stored) setHistory(JSON.parse(stored));
    const theme = localStorage.getItem("chihuahua-theme");
    if (theme === "dark") setDark(true);
  }, []);

  // Sauvegarder l'historique à chaque modification
  useEffect(() => {
    localStorage.setItem("chihuahua-history", JSON.stringify(history));
  }, [history]);

  // Sauvegarder le thème
  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("chihuahua-theme", dark ? "dark" : "light");
  }, [dark]);

  const handleClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setResult(null);
    } else if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      handleEqual();
    } else if (value === "%") {
      setInput((prev) => prev + "/100");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleEqual = () => {
    if (!input) return;
    try {
      // eslint-disable-next-line no-eval
      const res = eval(input);
      setResult(res);
      setHistory((prev) => {
        const newHistory = [`${input} = ${res}`, ...prev];
        return newHistory.slice(0, 10);
      });
      setInput("");
    } catch {
      setResult("Erreur");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        maxHeight: "100vh",
        overflow: "auto",
        background: dark ? "#222" : "#fffbe6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Bouton thème */}
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          position: "fixed",
          right: 16,
          top: 16,
          zIndex: 100,
          background: dark ? "#222" : "#ffe5b4",
          color: dark ? "#ffe5b4" : "#222",
          border: "2px solid #fff",
          borderRadius: 24,
          padding: "8px 18px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 6px #0002",
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Changer de thème"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {/* Calculatrice */}
      <div
        className="calculator-container"
        style={{
          background: "transparent",
          border: "none",
          boxShadow: "none",
          padding: 0,
          width: "100%",
          maxWidth: 350,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: 480, // pour laisser la place à la tête
        }}
      >
        {/* Tête du chihuahua en fond */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "110%",
            zIndex: 0,
            opacity: 0.25, // augmente l'opacité pour mieux voir la tête
            pointerEvents: "none",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          <ChihuahuaHead size={340} />
        </div>
        <div style={{ width: "100%", zIndex: 1, position: "relative" }}>
          {/* Cadran aligné */}
          <div
            style={{
              width: "100%",
              marginBottom: 8,
              background: dark
                ? "rgba(34,34,34,0.75)" // plus transparent pour voir la tête
                : "rgba(255,251,230,0.85)", // plus transparent pour voir la tête
              borderRadius: 16,
              boxShadow: "0 2px 8px #0002",
              border: "2px solid #e0b97a", // bordure dorée pour délimiter
              padding: 12,
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 80,
            }}
          >
            <div
              style={{
                fontSize: 18,
                minHeight: 24,
                color: dark ? "#ffe5b4" : "#7b4a00", // texte plus foncé pour contraster
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {input || "0"}
            </div>
            <div
              style={{
                fontSize: 28,
                minHeight: 32,
                color: result !== null ? "#388e3c" : (dark ? "#ffe5b4" : "#7b4a00"),
                fontWeight: "bold",
                marginBottom: 0,
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {result !== null ? result : ""}
            </div>
          </div>

          {/* Pavé de touches aligné */}
          <div
            className="calculator-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 4,
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Bouton historique */}
            <button
              onClick={() => setShowHistory(true)}
              style={{
                gridColumn: "span 4",
                background: "#e0b97a",
                color: "#222",
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 8,
                border: "none",
                borderRadius: 12,
                padding: "10px 0",
                boxShadow: "0 2px 6px #0002",
                cursor: "pointer",
              }}
            >
              📜 Historique
            </button>
            {BUTTONS.map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                style={{
                  fontSize: mobile ? 28 : 20,
                  padding: mobile ? 18 : 12,
                  background: btn === "="
                    ? "#e0b97a"
                    : dark
                      ? "rgba(68, 68, 68, 0.15)"
                      : "rgba(255, 229, 180, 0.92)", // plus opaque, plus lisible
                  color: btn === "="
                    ? "#222"
                    : dark
                    ? "#ffe5b4"
                    : "#7b4a00",
                  border: "1.5px solid #e0b97a",
                  borderRadius: 12,
                  margin: 2,
                  boxShadow: "0 2px 6px #e0b97a",
                  transition: "background 0.2s",
                  fontWeight: btn === "=" ? "bold" : "normal",
                  gridColumn: btn === "=" ? "span 4" : undefined,
                  backdropFilter: btn === "=" ? undefined : "blur(2px)",
                  zIndex: 1,
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Modale historique */}
      <Modal open={showHistory} onClose={() => setShowHistory(false)}>
        <History history={history} />
      </Modal>
    </div>
  );
}

export default App;

