import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titleId: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, titleId }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      const FOCUSABLE_ELEMENTS_SELECTOR = [
        'a[href]:not([tabindex="-1"])',
        'button:not([disabled]):not([tabindex="-1"])',
        'input:not([disabled]):not([tabindex="-1"])',
        'select:not([disabled]):not([tabindex="-1"])',
        'textarea:not([disabled]):not([tabindex="-1"])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      previousFocusElement.current = document.activeElement as HTMLElement;

      const modalElement = modalRef.current;
      if (!modalElement) return;

      const focusableElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR)
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (firstFocusableElement) {
        firstFocusableElement.focus();
      } else {
        modalElement.focus();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
          return;
        }

        if (event.key === "Tab") {
          event.preventDefault();

          if (!focusableElements.length) {
            return;
          }

          const activeElement = document.activeElement as HTMLElement;
          const currentIndex = focusableElements.indexOf(activeElement);

          if (event.shiftKey) {
            if (currentIndex === 0 || currentIndex === -1) {
              lastFocusableElement?.focus();
            } else {
              focusableElements[currentIndex - 1]?.focus();
            }
          } else {
            if (currentIndex === focusableElements.length - 1 || currentIndex === -1) {
              firstFocusableElement?.focus();
            } else {
              focusableElements[currentIndex + 1]?.focus();
            }
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        previousFocusElement.current?.focus();
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed z-[1000] inset-0 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Animation d'entrée */}
      <div
        className="bg-white/95 dark:bg-neutral-900/95 rounded-3xl p-6 min-w-[320px] max-w-[90vw] max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-orange-200/50 dark:border-orange-600/30 relative backdrop-blur-xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={e => e.stopPropagation()}
        style={{
          animation: open ? 'modalEnter 0.3s ease-out' : 'modalExit 0.2s ease-in'
        }}
      >
        {/* Bouton de fermeture amélioré */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-orange-100 dark:bg-neutral-700 hover:bg-orange-200 dark:hover:bg-neutral-600 transition-colors duration-200 flex items-center justify-center text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 z-10"
          aria-label="Fermer la modal"
        >
          ✕
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;