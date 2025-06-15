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

// Fonction pour rafraîchir le layout lors du redimensionnement de la fenêtre
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // ==================================================================
  // NOUVELLE GESTION RESPONSIVE PAR POINTS DE RUPTURE (BREAKPOINTS)
  // ==================================================================
  const screenWidth = useWindowWidth();
  const isSmall = screenWidth < 768;   // Pour téléphones
  const isMedium = screenWidth >= 768 && screenWidth < 1024; // Pour tablettes
  // Le cas "desktop" est géré par défaut (else)

  let headSize, headMarginBottom, calculatorPadding, screenMarginBottom, 
      screenMinHeight, historyButtonMarginBottom, buttonsGap, buttonMinHeight,
      mainContainerPadding, justifyContent, buttonFontSize, buttonPadding,
      themeButtonPadding, themeButtonFontSize;

  if (isSmall) {
    // --- Styles pour petits écrans (< 768px) ---
    justifyContent = "flex-start";
    mainContainerPadding = "10px 10px 20px 10px"; // Plus d'espace en bas
    headSize = 180;
    headMarginBottom = "-45px";
    calculatorPadding = "45px 16px 15px";
    screenMarginBottom = 12;
    screenMinHeight = 70;
    historyButtonMarginBottom = 12;
    buttonsGap = 8;
    buttonMinHeight = 44;
    buttonFontSize = 20;
    buttonPadding = "16px 8px";
    themeButtonPadding = "6px 8px";
    themeButtonFontSize = 14;
  } else if (isMedium) {
    // --- Styles pour écrans moyens (tablettes, 768px - 1024px) ---
    justifyContent = "center";
    mainContainerPadding = "20px";
    headSize = 260;
    headMarginBottom = "-60px";
    calculatorPadding = "80px 20px 20px";
    screenMarginBottom = 20;
    screenMinHeight = 90;
    historyButtonMarginBottom = 16;
    buttonsGap = 10;
    buttonMinHeight = 55;
    buttonFontSize = 22;
    buttonPadding = "18px 12px";
    themeButtonPadding = "8px 10px";
    themeButtonFontSize = 16;
  } else {
    // --- Styles par défaut (desktop, > 1024px) ---
    justifyContent = "center";
    mainContainerPadding = "20px";
    headSize = 300;
    headMarginBottom = "-60px";
    calculatorPadding = "100px 24px 24px";
    screenMarginBottom = 20;
    screenMinHeight = 100;
    historyButtonMarginBottom = 16;
    buttonsGap = 12;
    buttonMinHeight = 60;
    buttonFontSize = 24;
    buttonPadding = "20px 12px";
    themeButtonPadding = "8px 10px";
    themeButtonFontSize = 16;
  }
  // ==================================================================

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
        justifyContent: justifyContent,
        position: "relative",
        padding: mainContainerPadding,
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          position: "fixed",
          right: isSmall ? 12 : 16,
          top: isSmall ? 12 : 16,
          zIndex: 100,
          background: dark ? "#3d3d3d" : "#ffe5b4",
          color: dark ? "#ffe5b4" : "#7b4a00",
          border: `2px solid ${borderColor}`,
          borderRadius: 50,
          padding: themeButtonPadding,
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: `0 3px 10px ${
            dark ? "rgba(0,0,0,0.4)" : "rgba(139, 90, 43, 0.2)"
          }`,
          fontSize: themeButtonFontSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          minWidth: isSmall ? 32 : 36,
          minHeight: isSmall ? 32 : 36,
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
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: headMarginBottom,
            zIndex: 1,
          }}
        >
          <ChihuahuaHead size={headSize} />
        </div>

        <div
          style={{
            background: cardBg,
            borderRadius: 24,
            padding: calculatorPadding,
            width: "100%",
            boxSizing: "border-box",
            border: `3px solid ${borderColor}`,
            boxShadow: `0 10px 30px ${
              dark ? "rgba(0,0,0,0.5)" : "rgba(139, 90, 43, 0.2)"
            }`,
            backdropFilter: "blur(10px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              marginBottom: screenMarginBottom,
              background: dark
                ? "rgba(20, 20, 20, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
              borderRadius: 16,
              border: `2px solid ${borderColor}`,
              padding: isSmall ? "12px" : "20px 16px",
              textAlign: "center",
              minHeight: screenMinHeight,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
              boxShadow: `inset 0 2px 8px ${
                dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.1)"
              }`,
            }}
          >
            <div
              style={{
                fontSize: isSmall ? 16 : 18,
                color: dark ? "#bbb" : "#666",
                minHeight: 24,
                wordBreak: "break-all",
              }}
            >
              {input || "0"}
            </div>
            <div
              style={{
                fontSize: isSmall ? 24 : 32,
                color: result !== null ? "#2e7d32" : textColor,
                fontWeight: "bold",
                minHeight: isSmall ? 28 : 36,
                wordBreak: "break-all",
              }}
            >
              {result !== null ? result : ""}
            </div>
          </div>

          <button
            onClick={() => setShowHistory(true)}
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${borderColor} 0%, #d4a574 100%)`,
              color: "#fff",
              fontWeight: "bold",
              fontSize: isSmall ? 16 : 18,
              marginBottom: historyButtonMarginBottom,
              border: "none",
              borderRadius: 16,
              padding: isSmall ? "12px" : "14px",
              boxShadow: `0 4px 12px ${
                dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.3)"
              }`,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            📜 Voir l'historique
          </button>

          <div
            className="calculator-buttons"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: buttonsGap,
              width: "100%",
            }}
          >
            {BUTTONS.map((btn) => {
              const isOperator = ["=", "+", "-", "*", "/", "C", "⌫"].includes(
                btn
              );
              const isEquals = btn === "=";

              return (
                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  style={{
                    fontSize: buttonFontSize,
                    padding: buttonPadding,
                    background: isEquals
                      ? `linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)`
                      : isOperator
                      ? `linear-gradient(135deg, ${borderColor} 0%, #c19660 100%)`
                      : dark
                      ? "linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%)"
                      : "linear-gradient(135deg, #fff 0%, #f5f5f5 100%)",
                    color: isEquals || isOperator ? "#fff" : textColor,
                    border: `2px solid ${
                      isEquals ? "#2e7d32" : borderColor
                    }`,
                    borderRadius: 12,
                    boxShadow: `0 3px 8px ${
                      dark ? "rgba(0,0,0,0.3)" : "rgba(139, 90, 43, 0.2)"
                    }`,
                    transition: "all 0.15s ease",
                    fontWeight: isOperator ? "bold" : "500",
                    gridColumn: isEquals ? "span 4" : undefined,
                    cursor: "pointer",
                    minHeight: buttonMinHeight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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