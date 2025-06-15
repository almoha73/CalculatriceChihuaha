import React from "react";

// Ce composant "simple" accepte des classes Tailwind pour être stylisé par son parent.
const ChihuahuaHead: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg
      viewBox="0 0 320 260"
      className="h-full w-full" // Le SVG remplira son conteneur
    >
      {/* Oreille gauche */}
      <path
        d="M60,90 Q-10,10 80,40 Q100,70 60,90"
        fill="#eac086"
        stroke="#8b5a2b"
        strokeWidth="3"
      />
      {/* Oreille droite */}
      <path
        d="M260,90 Q330,10 240,40 Q220,70 260,90"
        fill="#eac086"
        stroke="#8b5a2b"
        strokeWidth="3"
      />
      {/* Tête principale */}
      <ellipse
        cx="160"
        cy="140"
        rx="100"
        ry="90"
        fill="#ffe5b4"
        stroke="#8b5a2b"
        strokeWidth="3"
      />
      {/* Joues */}
      <ellipse cx="90" cy="170" rx="25" ry="18" fill="#f9d98a" />
      <ellipse cx="230" cy="170" rx="25" ry="18" fill="#f9d98a" />
      {/* Yeux */}
      <ellipse cx="120" cy="130" rx="15" ry="20" fill="#fff" />
      <ellipse cx="200" cy="130" rx="15" ry="20" fill="#fff" />
      <ellipse cx="120" cy="135" rx="8" ry="12" fill="#2d1810" />
      <ellipse cx="200" cy="135" rx="8" ry="12" fill="#2d1810" />
      {/* Reflets dans les yeux */}
      <ellipse cx="123" cy="130" rx="3" ry="4" fill="#fff" />
      <ellipse cx="203" cy="130" rx="3" ry="4" fill="#fff" />
      {/* Truffe */}
      <ellipse cx="160" cy="175" rx="12" ry="8" fill="#2d1810" />
      <ellipse cx="160" cy="173" rx="4" ry="3" fill="#fff" opacity="0.3" />
      {/* Museau */}
      <path
        d="M160,183 Q150,195 140,190"
        stroke="#2d1810"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M160,183 Q170,195 180,190"
        stroke="#2d1810"
        strokeWidth="2"
        fill="none"
      />
      {/* Sourcils expressifs */}
      <path
        d="M105,115 Q120,108 135,115"
        stroke="#8b5a2b"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M185,115 Q200,108 215,115"
        stroke="#8b5a2b"
        strokeWidth="3"
        fill="none"
      />
      {/* Poils sur les oreilles */}
      <path
        d="M40,60 Q30,45 55,55"
        stroke="#8b5a2b"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M280,60 Q290,45 265,55"
        stroke="#8b5a2b"
        strokeWidth="2"
        fill="none"
      />
      {/* Petits poils décoratifs */}
      <path
        d="M75,100 Q70,95 80,98"
        stroke="#8b5a2b"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M245,100 Q250,95 240,98"
        stroke="#8b5a2b"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  </div>
);

export default ChihuahuaHead;