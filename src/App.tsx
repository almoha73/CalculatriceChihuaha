import { useState, useEffect, useCallback } from "react";
import History from "./History";
import ChihuahuaHead from "./ChihuahuaHead";
import Modal from "./Modal";
import "./index.css"; 

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
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const isDark = savedTheme === "dark" || (!savedTheme && systemDark);
    setDark(isDark);
    
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    
    if (dark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const processKeyPress = useCallback((value: string) => {
    if (value === "C") { 
      setInput(""); 
      setResult(null); 
    }
    else if (value === "⌫") { 
      setInput((prev) => prev.slice(0, -1)); 
      if (result) setResult(null);
    }
    else if (value === "=") {
      if (!input.trim()) return;
      
      setIsCalculating(true);
      
      // Petit délai pour l'animation
      setTimeout(() => {
        try {
          const res = eval(input);
          const resultString = res.toString();
          setResult(resultString);
          
          // Ajouter à l'historique seulement une fois
          const historyEntry = `${input} = ${resultString}`;
          setHistory((prevHistory) => {
            // Vérifier si cette entrée existe déjà pour éviter les doublons
            if (prevHistory[0] === historyEntry) {
              return prevHistory;
            }
            return [historyEntry, ...prevHistory].slice(0, 15);
          });
          
          setIsCalculating(false);
        } catch {
          setResult("Erreur");
          setIsCalculating(false);
        }
      }, 200);
    }
    else if (value === "%") { 
      setInput((prev) => prev + "/100"); 
    }
    else { 
      setInput((prev) => prev + value); 
      if (result) setResult(null);
    }
  }, [input, result]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey, ctrlKey, metaKey, altKey } = event;
      let calculatorAction: string | null = null;

      // Empêcher les actions par défaut pour les touches de calculatrice
      if (key >= "0" && key <= "9" && !shiftKey && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = key;
      }
      else if ((key === "." || key === ",") && !shiftKey && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = ".";
      }
      else if (key === "/" && !shiftKey && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "/";
        event.preventDefault();
      }
      else if (key === "-" && !shiftKey && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "-";
      }
      else if ((key === "+" || (shiftKey && key === "=")) && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "+";
        event.preventDefault();
      }
      else if ((key === "*" || (shiftKey && key === "8")) && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "*";
        event.preventDefault();
      }
      else if ((key === "%" || (shiftKey && key === "5")) && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "%";
      }
      else if ((key === "(" || (shiftKey && key === "9")) && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "(";
      }
      else if ((key === ")" || (shiftKey && key === "0")) && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = ")";
      }
      else if ((key === "=" || key === "Enter") && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "=";
        event.preventDefault();
      }
      else if (key === "Backspace" && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "⌫";
        event.preventDefault();
      }
      else if (key === "Escape" && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "C";
      }
      else if (key.toLowerCase() === "c" && !shiftKey && !ctrlKey && !metaKey && !altKey) {
        calculatorAction = "C";
      }

      if (calculatorAction) {
        processKeyPress(calculatorAction);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [processKeyPress]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-orange-950 p-4 relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100/10 dark:bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <button
        onClick={() => setDark(!dark)}
        className="fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 dark:bg-neutral-800/80 text-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg border border-orange-200/50 dark:border-orange-600/30"
      >
        <span className="transition-transform duration-300">
          {dark ? "☀️" : "🌙"}
        </span>
      </button>

      <div className="w-full max-w-[360px] pt-16 md:max-w-md md:pt-20 lg:max-w-md lg:pt-20 relative z-10">
        
        {/* Tête de Chihuahua avec animation */}
        <div className="relative h-24 md:h-28 lg:h-32 mb-4"> 
          <ChihuahuaHead 
            className={`absolute bottom-0 left-1/2 w-52 -translate-x-1/2 md:w-64 lg:w-72 transition-transform duration-300 ${
              isCalculating ? 'animate-bounce' : 'hover:scale-105'
            }`} 
          />
          {isCalculating && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl animate-spin">
              🧮
            </div>
          )}
        </div>

        {/* Calculatrice principale */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-white/90 to-orange-50/90 dark:from-neutral-800/90 dark:to-neutral-900/90 p-4 shadow-2xl backdrop-blur-xl border border-orange-200/50 dark:border-orange-600/20 md:p-5">
          
          {/* Écran de la calculatrice */}
          <div className="mb-4 min-h-[100px] rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-800 dark:from-black dark:to-neutral-900 p-4 text-right shadow-inner border-2 border-neutral-700 md:min-h-[110px] lg:p-5 relative overflow-hidden">
            {/* Effet de reflet sur l'écran */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="min-h-[32px] font-mono text-lg text-green-400 break-all md:text-xl lg:text-2xl transition-all duration-200">
                {input || "0"}
              </div>
              <div className={`min-h-[40px] text-3xl font-bold text-green-300 break-all md:text-4xl transition-all duration-300 ${
                isCalculating ? 'animate-pulse text-yellow-400' : ''
              }`}>
                {isCalculating ? "Calcul..." : (result !== null ? result : "")}
              </div>
            </div>
            
            {/* Indicateur LED */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
          </div>

          {/* Bouton historique */}
          <button
            onClick={() => setShowHistory(true)}
            className="mb-4 w-full rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-orange-500/50 md:py-4 md:text-lg"
          >
            <span className="mr-2">📜</span>
            Historique des calculs
          </button>

          {/* Grille des boutons */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {BUTTONS.map((btn) => {
              const isOperator = ["%", "/", "*", "-", "+"].includes(btn);
              const isControl = ["C", "⌫", "(", ")"].includes(btn);
              const isEquals = btn === "=";
              const isNumber = /^[0-9.]$/.test(btn);

              const baseClasses = "rounded-xl font-bold transition-all duration-150 active:scale-95 py-3 md:py-4 text-xl md:text-2xl shadow-lg hover:shadow-xl border-2 relative overflow-hidden group";
              
              const numberClasses = `bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-800 border-gray-300 shadow-gray-200/50 dark:from-neutral-700 dark:to-neutral-800 dark:hover:from-neutral-600 dark:hover:to-neutral-700 dark:text-white dark:border-neutral-600 dark:shadow-neutral-800/50`;
              
              const operatorClasses = `bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-orange-400 shadow-orange-300/50 dark:shadow-orange-900/50`;
              
              const controlClasses = `bg-gradient-to-b from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white border-gray-300 shadow-gray-300/50 dark:from-neutral-600 dark:to-neutral-700 dark:hover:from-neutral-500 dark:hover:to-neutral-600 dark:border-neutral-500`;
              
              const equalsClasses = `col-span-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-green-500 shadow-green-300/50 dark:shadow-green-900/50`;
              
              const btnClasses = `${baseClasses} ${
                isEquals ? equalsClasses : 
                isOperator ? operatorClasses : 
                isControl ? controlClasses : 
                numberClasses
              }`;

              return (
                <button 
                  key={btn} 
                  onClick={() => processKeyPress(btn)} 
                  className={btnClasses}
                  disabled={isCalculating}
                >
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                  <span className="relative z-10">{btn}</span>
                </button>
              );
            })}
          </div>

          {/* Signature discrète */}
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 font-mono">
            🐕 Calculatrice Chihuahua v2.0
          </div>
        </div>
      </div>

      <Modal open={showHistory} onClose={() => setShowHistory(false)} titleId="history-title">
        <History history={history} />
      </Modal>
    </main>
  );
}

export default App;