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
      maxHeight: 120,
      overflowY: "auto",
      background: "#fff3c1",
      border: "2px solid #e0b97a",
      borderRadius: 16,
      padding: 12,
      boxShadow: "0 4px 16px #0001",
      width: "100%",
      boxSizing: "border-box",
      color: "#7b4a00",
      fontWeight: 500,
    }}
  >
    <h3 style={{ marginTop: 0, textAlign: "center" }}>Historique</h3>
    <ul style={{ paddingLeft: 20, margin: 0 }}>
      {history.length === 0 && <li style={{ color: "#b48a4a" }}>Aucun calcul</li>}
      {history.map((item, idx) => (
        <li key={idx} style={{ marginBottom: 6 }}>{item}</li>
      ))}
    </ul>
  </div>
);

export default History;