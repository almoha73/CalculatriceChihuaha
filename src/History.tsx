import React from "react";

interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => (
  <div
    className="history-container min-w-0 max-w-[400px] max-h-[300px] overflow-y-auto bg-yellow-50 dark:bg-neutral-900 border-2 border-yellow-300 dark:border-neutral-700 rounded-2xl p-4 shadow-lg w-full box-border text-yellow-900 dark:text-white font-medium"
  >
    <h3 className="mt-0 mb-4 text-center text-yellow-800 dark:text-orange-200 font-bold">
      📜 Historique des calculs
    </h3>
    <div>
      {history.length === 0 && (
        <p className="text-yellow-700 dark:text-orange-300 italic text-center py-5">
          Aucun calcul pour le moment
        </p>
      )}
      {history.map((item, idx) => (
        <div 
          key={idx}
          className="mb-2 px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg border border-yellow-300 dark:border-neutral-700 shadow-sm text-sm font-mono"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

export default History;