import React from "react";

const ChihuahuaEars: React.FC = () => (
  <svg
    viewBox="0 0 300 100"
    width="100%"
    height="70"
    style={{ display: "block", margin: "0 auto" }}
  >
    {/* Oreille gauche */}
    <path
      d="M60,90 Q30,10 80,30 Q90,40 60,90"
      fill="#fbe8b0"
      stroke="#b48a4a"
      strokeWidth="3"
    />
    {/* Poils gauche */}
    <path
      d="M55,60 Q50,50 60,55"
      stroke="#b48a4a"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M65,50 Q60,40 70,45"
      stroke="#b48a4a"
      strokeWidth="2"
      fill="none"
    />
    {/* Oreille droite */}
    <path
      d="M240,90 Q270,10 220,30 Q210,40 240,90"
      fill="#fbe8b0"
      stroke="#b48a4a"
      strokeWidth="3"
    />
    {/* Poils droite */}
    <path
      d="M245,60 Q250,50 240,55"
      stroke="#b48a4a"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M235,50 Q240,40 230,45"
      stroke="#b48a4a"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export default ChihuahuaEars;