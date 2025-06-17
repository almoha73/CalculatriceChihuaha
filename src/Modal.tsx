import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titleId: string; // Pour aria-labelledby
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, titleId }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusElement = useRef<HTMLElement | null>(null);

  // Sélecteur pour les éléments focusables
  const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  useEffect(() => {
    if (open) {
      previousFocusElement.current = document.activeElement as HTMLElement;

      const modalElement = modalRef.current;
      if (!modalElement) return;

      const focusableElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR)
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      // Mettre le focus sur le premier élément interactif ou la modale elle-même
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

        // Tab trapping
        if (event.key === "Tab") {
          // Empêcher le comportement de tabulation par défaut pour rester dans la modale
          event.preventDefault();

          if (!focusableElements.length) {
            // S'il n'y a aucun élément focusable, on ne fait rien de plus (le focus reste sur la modale)
            return;
          }

          const activeElement = document.activeElement as HTMLElement;
          const currentIndex = focusableElements.indexOf(activeElement);

          if (event.shiftKey) { // Shift + Tab
            if (currentIndex === 0 || currentIndex === -1) { // Si sur le premier ou focus sur la modale elle-même
              lastFocusableElement?.focus();
            } else {
              focusableElements[currentIndex - 1]?.focus();
            }
          } else { // Tab
            if (currentIndex === focusableElements.length - 1 || currentIndex === -1) { // Si sur le dernier ou focus sur la modale
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
      className="fixed z-[1000] inset-0 flex items-center justify-center p-5 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      ref={modalRef}
      tabIndex={-1} // Permet à la div d'être focusable par programmation
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