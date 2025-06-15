import React from "react";

const ChihuahuaHead: React.FC<{ size?: number; className?: string }> = ({ size = 120, className }) => (
  <div
    className={className}
    style={{
      position: "relative",
      width: size,
      maxWidth: size,
      minWidth: 60,
      margin: "0 auto",
      marginBottom: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <svg
      viewBox="0 0 320 260"
      width={size}
      height={size * 0.8}
      style={{
        maxWidth: size,
        minWidth: 100,
        pointerEvents: "none",
      }}
    >
      {/* Oreille gauche */}
      <path
        d="M60,90 Q-10,10 80,40 Q100,70 60,90"
        fill="#eac086"
        stroke="#b48a4a"
        strokeWidth="4"
      />
      {/* Oreille droite */}
      <path
        d="M260,90 Q330,10 240,40 Q220,70 260,90"
        fill="#eac086"
        stroke="#b48a4a"
        strokeWidth="4"
      />
      {/* Tête */}
      <ellipse
        cx="160"
        cy="140"
        rx="100"
        ry="90"
        fill="#ffe5b4"
        stroke="#b48a4a"
        strokeWidth="4"
      />
      {/* Joues */}
      <ellipse cx="90" cy="170" rx="25" ry="18" fill="#f9d98a" />
      <ellipse cx="230" cy="170" rx="25" ry="18" fill="#f9d98a" />
      {/* Yeux */}
      <ellipse cx="120" cy="140" rx="12" ry="16" fill="#fff" />
      <ellipse cx="200" cy="140" rx="12" ry="16" fill="#fff" />
      <ellipse cx="120" cy="145" rx="5" ry="8" fill="#4d2c0c" />
      <ellipse cx="200" cy="145" rx="5" ry="8" fill="#4d2c0c" />
      {/* Truffe */}
      <ellipse cx="160" cy="175" rx="12" ry="8" fill="#4d2c0c" />
      {/* Museau */}
      <path
        d="M160,183 Q150,195 140,190"
        stroke="#4d2c0c"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M160,183 Q170,195 180,190"
        stroke="#4d2c0c"
        strokeWidth="3"
        fill="none"
      />
      {/* Sourcils */}
      <path
        d="M110,125 Q120,120 130,125"
        stroke="#b48a4a"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M190,125 Q200,120 210,125"
        stroke="#b48a4a"
        strokeWidth="2"
        fill="none"
      />
      {/* Poils oreilles */}
      <path
        d="M40,60 Q30,50 60,55"
        stroke="#b48a4a"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M280,60 Q290,50 260,55"
        stroke="#b48a4a"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  </div>
);

export default ChihuahuaHead;