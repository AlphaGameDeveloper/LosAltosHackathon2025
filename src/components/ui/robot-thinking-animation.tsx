"use client";

import React from "react";

interface RobotThinkingAnimationProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

const RobotThinkingAnimation: React.FC<RobotThinkingAnimationProps> = ({
  size = 200,
  primaryColor = "#4F46E5", // Indigo
  secondaryColor = "#10B981", // Emerald
  tertiaryColor = "#F59E0B", // Amber
}) => {
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes bodyBounce {
              0%, 100% { transform: translateY(0); }
              25% { transform: translateY(5px); }
              75% { transform: translateY(-5px); }
            }
            
            @keyframes headTilt {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-5deg); }
              75% { transform: rotate(5deg); }
            }
            
            @keyframes eyeBlink {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.2); }
            }
            
            @keyframes mouthMove {
              0%, 100% { width: 40px; }
              25% { width: 20px; }
              75% { width: 30px; }
            }
            
            @keyframes antennaExtend {
              0%, 100% { y2: 15; }
              50% { y2: 10; }
            }
            
            @keyframes antennaPulse {
              0%, 100% { opacity: 0.8; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            
            @keyframes leftArmWave {
              0%, 100% { transform: translate(0, 0); }
              25% { transform: translate(10px, -10px); }
              75% { transform: translate(-10px, 10px); }
            }
            
            @keyframes rightArmWave {
              0%, 100% { transform: translate(0, 0); }
              25% { transform: translate(-10px, -10px); }
              75% { transform: translate(10px, 10px); }
            }
            
            @keyframes leftLegDance {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(-5deg); }
            }
            
            @keyframes rightLegDance {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(5deg); }
            }
            
            .robot-body {
              animation: bodyBounce 2s infinite;
            }
            
            .robot-head {
              animation: headTilt 1.5s infinite;
              transform-origin: center;
            }
            
            .robot-eye-left {
              animation: eyeBlink 1s infinite;
              animation-delay: 0s;
              transform-origin: center;
            }
            
            .robot-eye-right {
              animation: eyeBlink 1s infinite;
              animation-delay: 0.4s;
              transform-origin: center;
            }
            
            .robot-mouth {
              animation: mouthMove 2s infinite;
            }
            
            .robot-antenna-line {
              animation: antennaExtend 1s infinite;
            }
            
            .robot-antenna-circle {
              animation: antennaPulse 1s infinite;
              transform-origin: center;
            }
            
            .robot-arm-left {
              animation: leftArmWave 2s infinite;
              transform-origin: 50px 90px;
            }
            
            .robot-arm-right {
              animation: rightArmWave 2s infinite;
              animation-delay: 0.5s;
              transform-origin: 150px 90px;
            }
            
            .robot-leg-left {
              animation: leftLegDance 1s infinite;
              transform-origin: 70px 150px;
            }
            
            .robot-leg-right {
              animation: rightLegDance 1s infinite;
              animation-delay: 0.5s;
              transform-origin: 130px 150px;
            }
          `}
        </style>

        {/* Robot body */}
        <rect
          className="robot-body"
          x="50"
          y="70"
          width="100"
          height="80"
          rx="10"
          fill={primaryColor}
        />

        {/* Robot head */}
        <rect
          className="robot-head"
          x="65"
          y="30"
          width="70"
          height="40"
          rx="8"
          fill={primaryColor}
        />

        {/* Robot eyes */}
        <circle
          className="robot-eye-left"
          cx="85"
          cy="50"
          r="8"
          fill={secondaryColor}
        />
        <circle
          className="robot-eye-right"
          cx="115"
          cy="50"
          r="8"
          fill={secondaryColor}
        />

        {/* Robot mouth */}
        <rect
          className="robot-mouth"
          x="80"
          y="65"
          width="40"
          height="5"
          rx="2"
          fill={secondaryColor}
        />

        {/* Robot antenna */}
        <line
          className="robot-antenna-line"
          x1="100"
          y1="30"
          x2="100"
          y2="15"
          stroke={tertiaryColor}
          strokeWidth="3"
        />
        <circle
          className="robot-antenna-circle"
          cx="100"
          cy="10"
          r="5"
          fill={tertiaryColor}
        />

        {/* Robot arms */}
        <line
          className="robot-arm-left"
          x1="50"
          y1="90"
          x2="20"
          y2="100"
          stroke={primaryColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <line
          className="robot-arm-right"
          x1="150"
          y1="90"
          x2="180"
          y2="100"
          stroke={primaryColor}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Robot legs */}
        <line
          className="robot-leg-left"
          x1="70"
          y1="150"
          x2="70"
          y2="180"
          stroke={primaryColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          className="robot-leg-right"
          x1="130"
          y1="150"
          x2="130"
          y2="180"
          stroke={primaryColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default RobotThinkingAnimation;
