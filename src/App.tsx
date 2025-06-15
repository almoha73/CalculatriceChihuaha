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

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("chihuahua-history");
    if (stored) setHistory(JSON.parse(stored));
    const theme = localStorage.getItem("chihuahua-theme");
    if (theme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("chihuahua-history", JSON.stringify(history));
  }, [history]);

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

  // Les styles dynamiques qui dépendent de l'état (dark mode) restent ici
  const borderColor = dark ? "#8b5a2b" : "#e0b97a";
  const textColor = dark ? "#ffe5b4" : "#7b4a00";

  return (
    <div className="main-container">
      <button
        className="theme-toggle"
        onClick={() => setDark((d) => !d)}
        style={{
          background: dark ? "#3d3d3d" : "#ffe5b4",
          color: dark ? "#ffe5b4" : "#7b4a00",
          border: `2px solid ${borderColor}`,
          boxShadow: `0 3px 10px ${
            dark ? "rgba(0,0,0,0.4)" : "rgba(139, 90, 43, 0.2)"
          }`,
        }}
        aria-label="Changer de thème"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      <div className="calculator-wrapper">
        <div className="chihuahua-head-container">
          <ChihuahuaHead />
        </div>

        <div className="calculator-card" style={{ 
          background: dark ? "rgba(50, 50, 50, 0.95)" : "rgba(255, 251, 230, 0.95)",
          border: `3px solid ${borderColor}`,
          boxShadow: `0 10px 30px ${
            dark ? "rgba(0,0,0,0.5)" : "rgba(139, 90, 43, 0.2)"
          }`,
        }}>
          <div className="calculator-screen" style={{
            background: dark ? "rgba(20, 20, 20, 0.9)" : "rgba(255, 255, 255, 0.9)",
            border: `2px solid ${borderColor}`,
            boxShadow: `inset 0 2px 8px ${
              dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.1)"
            }`,
          }}>
            <div className="screen-input" style={{ color: dark ? "#bbb" : "#666" }}>
              {input || "0"}
            </div>
            <div className="screen-result" style={{ color: result !== null && result !== "Erreur" ? "#2e7d32" : (result === "Erreur" ? "#d32f2f" : textColor) }}>
              {result !== null ? result : ""}
            </div>
          </div>

          <button className="history-button" onClick={() => setShowHistory(true)} style={{
             background: `linear-gradient(135deg, ${borderColor} 0%, #d4a574 100%)`,
             boxShadow: `0 4px 12px ${
                dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.3)"
              }`,
          }}>
            📜 Voir l'historique
          </button>

          <div className="buttons-grid">
            {BUTTONS.map((btn) => {
              const isOperator = ["=", "+", "-", "*", "/", "C", "⌫"].includes(btn);
              const isEquals = btn === "=";

              return (
                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  className={isEquals ? "btn-equals" : isOperator ? "btn-operator" : "btn-number"}
                  style={{
                    color: isEquals || isOperator ? "#fff" : textColor,
                    border: `2px solid ${isEquals ? "#2e7d32" : borderColor}`,
                    background: isEquals
                      ? `linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)`
                      : isOperator
                      ? `linear-gradient(135deg, ${borderColor} 0%, #c19660 100%)`
                      : dark
                      ? "linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%)"
                      : "linear-gradient(135deg, #fff 0%, #f5f5f5 100%)",
                     boxShadow: `0 3px 8px ${
                      dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.2)"
                    }`,
                  }}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Modal open={showHistory} onClose={() => setShowHistory(false)}>
        <History history={history} />
      </Modal>
    </div>
  );
}

export default App;