import React from "react";

interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => (
  <div
    tabIndex={0}
    aria-label="Historique des calculs, utilisez les flèches haut et bas pour faire défiler si le contenu dépasse."
    className="history-container min-w-0 max-w-[400px] max-h-[400px] overflow-y-auto bg-gradient-to-b from-amber-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 border-2 border-orange-300 dark:border-orange-600/30 rounded-2xl p-5 shadow-xl w-full box-border text-orange-900 dark:text-orange-100 font-medium backdrop-blur-sm"
  >
    <h3 id="history-title" className="mt-0 mb-5 text-center text-orange-800 dark:text-orange-200 font-bold text-xl">
      📜 Historique des calculs
    </h3>
    
    <div className="space-y-3">
      {history.length === 0 && (
        <div className="text-orange-700 dark:text-orange-300 italic text-center py-8 bg-white/50 dark:bg-neutral-800/50 rounded-xl border border-orange-200 dark:border-orange-600/20">
          <div className="text-4xl mb-2">🤔</div>
          <p>Aucun calcul pour le moment.</p>
          <p className="text-sm mt-1">Commencez à calculer !</p>
        </div>
      )}
      
      {history.map((item, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden bg-white dark:bg-neutral-800 rounded-xl border border-orange-200 dark:border-orange-600/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
        >
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/50 dark:via-orange-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
          
          <div className="relative z-10 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                #{history.length - idx}
              </span>
              <span className="text-xs text-orange-500 dark:text-orange-400">
                🧮
              </span>
            </div>
            <div className="font-mono text-sm mt-1 text-gray-800 dark:text-gray-200">
              {item}
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {history.length > 0 && (
      <div className="mt-4 text-center text-xs text-orange-600 dark:text-orange-400">
        {history.length} calcul{history.length > 1 ? 's' : ''} enregistré{history.length > 1 ? 's' : ''}
      </div>
    )}
  </div>
);

export default History;