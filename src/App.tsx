import React, { useState, useEffect } from "react";
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

  // Charger les données depuis le localStorage
  useEffect(() => {
    const stored = localStorage.getItem("chihuahua-history");
    if (stored) setHistory(JSON.parse(stored));
    const theme = localStorage.getItem("chihuahua-theme");
    if (theme === "dark") setDark(true);
  }, []);

  // Sauvegarder l'historique
  useEffect(() => {
    localStorage.setItem("chihuahua-history", JSON.stringify(history));
  }, [history]);

  // Gérer le thème
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
    if (!input.trim()) return;
    try {
      // eslint-disable-next-line no-eval
      const res = eval(input);
      setResult(res.toString());
      setHistory((prev) => {
        const newHistory = [`${input} = ${res}`, ...prev];
        return newHistory.slice(0, 15);
      });
      setInput("");
    } catch {
      setResult("Erreur");
    }
  };

  const containerBg = dark ? "#1a1a1a" : "#fffbe6";
  const cardBg = dark ? "rgba(50, 50, 50, 0.95)" : "rgba(255, 251, 230, 0.95)";
  const textColor = dark ? "#ffe5b4" : "#7b4a00";
  const borderColor = dark ? "#8b5a2b" : "#e0b97a";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: `linear-gradient(135deg, ${containerBg} 0%, ${dark ? "#2d2d2d" : "#f5e6d3"} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: mobile ? "10px" : "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Bouton thème en haut à droite, plus petit */}
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          position: "fixed",
          right: mobile ? 12 : 16,
          top: mobile ? 12 : 16,
          zIndex: 100,
          background: dark ? "#3d3d3d" : "#ffe5b4",
          color: dark ? "#ffe5b4" : "#7b4a00",
          border: `2px solid ${borderColor}`,
          borderRadius: 50,
          padding: mobile ? "6px 8px" : "8px 10px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: `0 3px 10px ${dark ? "rgba(0,0,0,0.4)" : "rgba(139, 90, 43, 0.2)"}`,
          fontSize: mobile ? 14 : 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          minWidth: mobile ? 32 : 36,
          minHeight: mobile ? 32 : 36,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
        aria-label="Changer de thème"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {/* Container principal */}
      <div
        className="calculator-container"
        style={{
          background: "transparent",
          padding: 0,
          width: "100%",
          maxWidth: 380,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Tête du chihuahua - plus visible */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "-60px", // Overlap avec la calculatrice
            zIndex: 1,
          }}
        >
          <ChihuahuaHead size={mobile ? 260 : 300} />
        </div>

        {/* Calculatrice */}
        <div
          style={{
            background: cardBg,
            borderRadius: 24,
            padding: mobile ? "80px 16px 20px" : "100px 24px 24px", // Padding top pour laisser place à la tête
            width: "100%",
            boxSizing: "border-box",
            border: `3px solid ${borderColor}`,
            boxShadow: `0 10px 30px ${dark ? "rgba(0,0,0,0.5)" : "rgba(139, 90, 43, 0.2)"}`,
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Écran de la calculatrice */}
          <div
            style={{
              width: "100%",
              marginBottom: 20,
              background: dark ? "rgba(20, 20, 20, 0.9)" : "rgba(255, 255, 255, 0.9)",
              borderRadius: 16,
              border: `2px solid ${borderColor}`,
              padding: mobile ? "16px 12px" : "20px 16px",
              textAlign: "center",
              minHeight: mobile ? 80 : 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
              boxShadow: `inset 0 2px 8px ${dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.1)"}`,
            }}
          >
            <div
              style={{
                fontSize: mobile ? 16 : 18,
                color: dark ? "#bbb" : "#666",
                minHeight: 24,
                wordBreak: "break-all",
              }}
            >
              {input || "0"}
            </div>
            <div
              style={{
                fontSize: mobile ? 24 : 32,
                color: result !== null ? "#2e7d32" : textColor,
                fontWeight: "bold",
                minHeight: mobile ? 28 : 36,
                wordBreak: "break-all",
              }}
            >
              {result !== null ? result : ""}
            </div>
          </div>

          {/* Bouton historique */}
          <button
            onClick={() => setShowHistory(true)}
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${borderColor} 0%, #d4a574 100%)`,
              color: "#fff",
              fontWeight: "bold",
              fontSize: mobile ? 16 : 18,
              marginBottom: 16,
              border: "none",
              borderRadius: 16,
              padding: mobile ? "12px" : "14px",
              boxShadow: `0 4px 12px ${dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.3)"}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.target as HTMLButtonElement).style.boxShadow = `0 6px 16px ${dark ? "rgba(0,0,0,0.4)" : "rgba(139, 90, 43, 0.4)"}`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0)";
              (e.target as HTMLButtonElement).style.boxShadow = `0 4px 12px ${dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.3)"}`;
            }}
          >
            📜 Voir l'historique
          </button>

          {/* Grille des boutons */}
          <div
            className="calculator-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: mobile ? 8 : 12,
              width: "100%",
            }}
          >
            {BUTTONS.map((btn) => {
              const isOperator = ["=", "+", "-", "*", "/", "C", "⌫"].includes(btn);
              const isEquals = btn === "=";
              
              return (
                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  style={{
                    fontSize: mobile ? 20 : 24,
                    padding: mobile ? "16px 8px" : "18px 12px",
                    background: isEquals
                      ? `linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)`
                      : isOperator
                      ? `linear-gradient(135deg, ${borderColor} 0%, #c19660 100%)`
                      : dark
                      ? "linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%)"
                      : "linear-gradient(135deg, #fff 0%, #f5f5f5 100%)",
                    color: isEquals || isOperator
                      ? "#fff"
                      : textColor,
                    border: `2px solid ${isEquals ? "#2e7d32" : borderColor}`,
                    borderRadius: 12,
                    boxShadow: `0 3px 8px ${dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.2)"}`,
                    transition: "all 0.15s ease",
                    fontWeight: isOperator ? "bold" : "500",
                    gridColumn: isEquals ? "span 4" : undefined,
                    cursor: "pointer",
                    minHeight: mobile ? 50 : 55,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
                    (e.target as HTMLButtonElement).style.boxShadow = `0 5px 12px ${dark ? "rgba(0,0,0,0.4)" : "rgba(139, 90, 43, 0.3)"}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.target as HTMLButtonElement).style.boxShadow = `0 3px 8px ${dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.2)"}`;
                  }}
                  onMouseDown={(e) => {
                    (e.target as HTMLButtonElement).style.transform = "translateY(1px)";
                  }}
                  onMouseUp={(e) => {
                    (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal historique */}
      <Modal open={showHistory} onClose={() => setShowHistory(false)}>
        <History history={history} />
      </Modal>
    </div>
  );
}

export default App;