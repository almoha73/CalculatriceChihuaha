import { useState, useEffect } from "react";
import "./App.css";
import History from "./History";
import ChihuahuaHead from "./ChihuahuaHead";

const BUTTONS = [
  "(", ")", "⌫", "C",
  "%", // Ajout ici
  "7", "8", "9", "/",
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
        width: "100vw",
        background: dark ? "#222" : "#fffbe6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden",
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

      <div
        className="main-flex"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          maxWidth: "100vw",
          padding: 0,
          margin: 0,
          gap: 0,
        }}
      >
        {/* Historique compact en haut */}
        <div
          style={{
            width: "94vw",
            maxWidth: 400,
            margin: "16px auto 0 auto",
            maxHeight: 120,
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <History history={history} />
        </div>

        {/* Calculatrice bien large */}
        <div
          className="calculator-container"
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            width: "100vw",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          <ChihuahuaHead>
            <div
              style={{
                width: "100%",
                maxWidth: 256,
                margin: "0 auto",
                marginBottom: 8,
                background: dark ? "rgba(34,34,34,0.85)" : "rgba(255,255,255,0.7)",
                borderRadius: 12,
                boxShadow: "0 2px 8px #0002",
                padding: 8,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  minHeight: 24,
                  textAlign: "right",
                  color: dark ? "#ffe5b4" : "#555",
                }}
              >
                {input || "0"}
              </div>
              <div
                style={{
                  fontSize: 28,
                  minHeight: 32,
                  textAlign: "right",
                  color: result !== null ? "#388e3c" : (dark ? "#ffe5b4" : "#fff8e1"),
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                {result !== null ? result : ""}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginBottom: 8,
                width: "100%",
                maxWidth: 256,
              }}
            >
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
                      ? "#444"
                      : "#222",
                    color: btn === "="
                      ? "#222"
                      : dark
                      ? "#ffe5b4"
                      : "#fffbe6",
                    border: "none",
                    borderRadius: 12,
                    margin: 2,
                    boxShadow: "0 2px 6px #0002",
                    transition: "background 0.2s",
                    fontWeight: btn === "=" ? "bold" : "normal",
                    gridColumn: btn === "=" ? "span 4" : undefined,
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </ChihuahuaHead>
        </div>
      </div>
    </div>
  );
}

export default App;
