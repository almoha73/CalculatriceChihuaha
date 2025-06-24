import React from "react";

const ChihuahuaHead: React.FC<{ className?: string; "aria-hidden"?: boolean }> = ({ className, ...props }) => (
  <div className={className} {...props}>
    <svg
      viewBox="0 0 320 260"
      className="h-full w-full drop-shadow-lg"
    >
      {/* Ombre portée */}
      <ellipse
        cx="162"
        cy="145"
        rx="98"
        ry="88"
        fill="rgba(0,0,0,0.1)"
        className="blur-sm"
      />
      
      {/* Oreille gauche avec dégradé */}
      <defs>
        <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4d03f" />
          <stop offset="100%" stopColor="#d68910" />
        </linearGradient>
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="50%" stopColor="#ffe5b4" />
          <stop offset="100%" stopColor="#f4d03f" />
        </linearGradient>
        <radialGradient id="eyeGradient" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f0f0" />
        </radialGradient>
        <radialGradient id="pupilGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
      </defs>
      
      <path
        d="M60,90 Q-10,10 80,40 Q100,70 60,90"
        fill="url(#earGradient)"
        stroke="#8b5a2b"
        strokeWidth="3"
        className="drop-shadow-sm"
      />
      
      {/* Oreille droite */}
      <path
        d="M260,90 Q330,10 240,40 Q220,70 260,90"
        fill="url(#earGradient)"
        stroke="#8b5a2b"
        strokeWidth="3"
        className="drop-shadow-sm"
      />
      
      {/* Tête principale avec dégradé */}
      <ellipse
        cx="160"
        cy="140"
        rx="100"
        ry="90"
        fill="url(#headGradient)"
        stroke="#8b5a2b"
        strokeWidth="3"
        className="drop-shadow-md"
      />
      
      {/* Joues avec effet de rougissement */}
      <ellipse cx="90" cy="170" rx="25" ry="18" fill="#ffb3ba" opacity="0.6" className="animate-pulse" />
      <ellipse cx="230" cy="170" rx="25" ry="18" fill="#ffb3ba" opacity="0.6" className="animate-pulse" />
      
      {/* Yeux avec dégradés */}
      <ellipse cx="120" cy="130" rx="15" ry="20" fill="url(#eyeGradient)" stroke="#ddd" strokeWidth="1" />
      <ellipse cx="200" cy="130" rx="15" ry="20" fill="url(#eyeGradient)" stroke="#ddd" strokeWidth="1" />
      
      {/* Pupilles avec dégradés */}
      <ellipse cx="120" cy="135" rx="8" ry="12" fill="url(#pupilGradient)" />
      <ellipse cx="200" cy="135" rx="8" ry="12" fill="url(#pupilGradient)" />
      
      {/* Reflets dans les yeux - plus prononcés */}
      <ellipse cx="123" cy="130" rx="4" ry="5" fill="#ffffff" opacity="0.9" />
      <ellipse cx="203" cy="130" rx="4" ry="5" fill="#ffffff" opacity="0.9" />
      <ellipse cx="125" cy="133" rx="2" ry="2" fill="#ffffff" opacity="0.7" />
      <ellipse cx="205" cy="133" rx="2" ry="2" fill="#ffffff" opacity="0.7" />
      
      {/* Truffe avec dégradé */}
      <ellipse cx="160" cy="175" rx="12" ry="8" fill="#2d1810" />
      <ellipse cx="160" cy="173" rx="6" ry="4" fill="#4a4a4a" opacity="0.5" />
      <ellipse cx="160" cy="171" rx="3" ry="2" fill="#ffffff" opacity="0.4" />
      
      {/* Museau */}
      <path
        d="M160,183 Q150,195 140,190"
        stroke="#2d1810"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M160,183 Q170,195 180,190"
        stroke="#2d1810"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Sourcils expressifs - plus épais */}
      <path
        d="M105,115 Q120,108 135,115"
        stroke="#8b5a2b"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M185,115 Q200,108 215,115"
        stroke="#8b5a2b"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Poils sur les oreilles - plus détaillés */}
      <path
        d="M40,60 Q30,45 55,55"
        stroke="#8b5a2b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M45,65 Q35,50 60,60"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M280,60 Q290,45 265,55"
        stroke="#8b5a2b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M275,65 Q285,50 260,60"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Petits poils décoratifs */}
      <path
        d="M75,100 Q70,95 80,98"
        stroke="#8b5a2b"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M245,100 Q250,95 240,98"
        stroke="#8b5a2b"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Moustaches */}
      <path
        d="M100,180 Q80,175 70,180"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M100,185 Q80,185 65,190"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M220,180 Q240,175 250,180"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M220,185 Q240,185 255,190"
        stroke="#8b5a2b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default ChihuahuaHead;