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

  useEffect(() => {
    // Initialiser le thème au chargement
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const isDark = savedTheme === "dark" || (!savedTheme && systemDark);
    setDark(isDark);
    
    // Appliquer la classe dark selon la documentation TailwindCSS v4
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    // Mettre à jour le thème quand l'état change
    document.documentElement.classList.toggle("dark", dark);
    
    // Sauvegarder la préférence
    if (dark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const processKeyPress = useCallback((value: string) => {
    if (value === "C") { setInput(""); setResult(null); }
    else if (value === "⌫") { setInput((prev) => prev.slice(0, -1)); }
    else if (value === "=") {
      setInput(currentInput => {
        if (!currentInput.trim()) return currentInput;
        try {
          // Attention: l'utilisation de eval() peut être dangereuse avec des entrées non fiables.
          // Pour une calculatrice de production, une bibliothèque d'analyse et d'évaluation serait préférable.
          const res = eval(currentInput);
          setResult(res.toString());
          setHistory((prevHistory) => [`${currentInput} = ${res}`, ...prevHistory].slice(0, 15));
          return ""; // Vide l'input après le calcul
        } catch {
          setResult("Erreur");
          return currentInput; // Conserve l'input en cas d'erreur
        }
      });
    }
    else if (value === "%") { setInput((prev) => prev + "/100"); }
    else { setInput((prev) => prev + value); }
  }, [setInput, setResult, setHistory]); // setInput, setResult, setHistory sont stables

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey, ctrlKey, metaKey, altKey } = event;
      let calculatorAction: string | null = null;

      if (key >= "0" && key <= "9" && !shiftKey && !ctrlKey && !metaKey && !altKey) calculatorAction = key;
      else if ((key === "." || key === ",") && !shiftKey && !ctrlKey && !metaKey && !altKey) calculatorAction = ".";
      else if (key === "/" && !shiftKey && !ctrlKey && !metaKey && !altKey) { calculatorAction = "/"; event.preventDefault(); }
      else if (key === "-" && !shiftKey && !ctrlKey && !metaKey && !altKey) calculatorAction = "-";
      else if ((key === "+" || (shiftKey && key === "=")) && !ctrlKey && !metaKey && !altKey) { calculatorAction = "+"; event.preventDefault(); }
      else if ((key === "*" || (shiftKey && key === "8")) && !ctrlKey && !metaKey && !altKey) { calculatorAction = "*"; event.preventDefault(); }
      else if ((key === "%" || (shiftKey && key === "5")) && !ctrlKey && !metaKey && !altKey) calculatorAction = "%";
      else if ((key === "(" || (shiftKey && key === "9")) && !ctrlKey && !metaKey && !altKey) calculatorAction = "(";
      else if ((key === ")" || (shiftKey && key === "0")) && !ctrlKey && !metaKey && !altKey) calculatorAction = ")";
      else if ((key === "=" || key === "Enter") && !ctrlKey && !metaKey && !altKey) { calculatorAction = "="; event.preventDefault(); }
      else if (key === "Backspace" && !ctrlKey && !metaKey && !altKey) { calculatorAction = "⌫"; event.preventDefault(); }
      else if (key === "Escape" && !ctrlKey && !metaKey && !altKey) calculatorAction = "C";
      else if (key.toLowerCase() === "c" && !shiftKey && !ctrlKey && !metaKey && !altKey) calculatorAction = "C";

      if (calculatorAction && BUTTONS.includes(calculatorAction)) {
        processKeyPress(calculatorAction);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [processKeyPress]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-stone-200 to-stone-400 p-4 dark:from-neutral-900 dark:to-black">
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200/50 text-xl text-zinc-800 backdrop-blur-sm transition hover:scale-110 dark:bg-neutral-800/50 dark:text-orange-300 md:h-12 md:w-12"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {/* Les valeurs 'lg:' ont été réduites pour éviter le scroll sur grand écran */}
      <div className="w-full max-w-[340px] pt-16 md:max-w-md md:pt-20 lg:max-w-md lg:pt-20">
        
        <div className="relative h-20 md:h-24 lg:h-24"> 
          <ChihuahuaHead className="absolute bottom-0 left-1/2 w-48 -translate-x-1/2 md:w-60 lg:w-64" />
        </div>

        <div className="relative w-full rounded-3xl border-2 border-orange-800/20 bg-orange-50/80 p-3 shadow-2xl backdrop-blur-lg dark:border-orange-600/20 dark:bg-neutral-800/80 md:p-4">
          
          <div className="mb-3 min-h-[90px] rounded-xl border border-orange-800/10 bg-orange-100/70 p-3 text-right dark:border-orange-600/20 dark:bg-black/20 md:min-h-[100px] lg:p-4">
            <div className="min-h-[28px] font-bold text-lg text-zinc-500 dark:text-zinc-400 break-all md:text-xl lg:text-2xl">{input || "0"}</div>
            <div className="min-h-[36px] text-3xl font-bold text-orange-900 dark:text-orange-200 break-all md:text-4xl">
              {result !== null ? result : ""}
            </div>
          </div>

          <button
            onClick={() => setShowHistory(true)}
            className="mb-3 w-full rounded-xl bg-orange-700 py-2 text-base font-bold text-orange-100 shadow-md transition hover:bg-orange-800 active:translate-y-px md:py-3 md:text-lg"
          >
            📜 Voir l'historique
          </button>

          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {BUTTONS.map((btn) => {
              const isOperator = ["%", "/", "*", "-", "+"].includes(btn);
              const isControl = ["C", "⌫", "(", ")"].includes(btn);
              const isEquals = btn === "=";

              const baseClasses = "rounded-lg border-b-4 text-xl font-semibold transition active:translate-y-0.5 active:border-b-2 py-2 md:py-3 md:text-2xl";
              
              const numberClasses = `border-zinc-300 bg-zinc-200 text-zinc-800 hover:bg-zinc-100 dark:border-neutral-600 dark:bg-neutral-700 dark:text-zinc-100 dark:hover:bg-neutral-600`;
              const operatorClasses = `border-orange-800 bg-orange-700 text-orange-100 hover:bg-orange-600`;
              const controlClasses = `border-zinc-400 bg-zinc-300 text-zinc-700 hover:bg-zinc-200 dark:border-neutral-500 dark:bg-neutral-600 dark:text-zinc-100 dark:hover:bg-neutral-500`;
              const equalsClasses = `col-span-4 border-orange-950 bg-orange-900 text-orange-100 hover:bg-orange-800`;
              
              const btnClasses = `${baseClasses} ${isEquals ? equalsClasses : isOperator ? operatorClasses : isControl ? controlClasses : numberClasses}`;

              return (
                <button key={btn} onClick={() => processKeyPress(btn)} className={btnClasses}>
                  {btn}
                </button>
              );
            })}
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