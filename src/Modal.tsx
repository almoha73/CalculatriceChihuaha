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
      className="fixed z-[1000] inset-0 flex items-center justify-center p-5 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-yellow-50 dark:bg-neutral-900 rounded-2xl p-6 min-w-[300px] max-w-[90vw] max-h-[80vh] overflow-y-auto shadow-xl border-2 border-yellow-300 dark:border-neutral-700 relative"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;