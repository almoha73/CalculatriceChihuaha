import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fffbe6",
          borderRadius: 20,
          padding: 24,
          minWidth: 300,
          maxWidth: "90vw",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 10px 40px rgba(139, 90, 43, 0.3)",
          position: "relative",
          border: "2px solid #e0b97a",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 32,
            cursor: "pointer",
            color: "#8b5a2b",
            fontWeight: "bold",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.color = "#d4a574";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.color = "#8b5a2b";
          }}
          aria-label="Fermer"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;