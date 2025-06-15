import React from "react";

interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => (
  <div
    className="history-container"
    style={{
      minWidth: 0,
      maxWidth: 400,
      maxHeight: 300,
      overflowY: "auto",
      background: "#fff3c1",
      border: "2px solid #e0b97a",
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      width: "100%",
      boxSizing: "border-box",
      color: "#7b4a00",
      fontWeight: 500,
    }}
  >
    <h3 style={{ 
      marginTop: 0, 
      textAlign: "center", 
      color: "#8b5a2b",
      marginBottom: 16 
    }}>
      📜 Historique des calculs
    </h3>
    <div style={{ margin: 0 }}>
      {history.length === 0 && (
        <p style={{ 
          color: "#b48a4a", 
          fontStyle: "italic", 
          textAlign: "center",
          padding: "20px 0"
        }}>
          Aucun calcul pour le moment
        </p>
      )}
      {history.map((item, idx) => (
        <div 
          key={idx} 
          style={{ 
            marginBottom: 8, 
            padding: "12px 16px", 
            background: "#fff", 
            borderRadius: 10,
            border: "1px solid #e0b97a",
            boxShadow: "0 2px 4px rgba(139, 90, 43, 0.1)",
            fontSize: 14,
            fontFamily: "monospace"
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

export default History;