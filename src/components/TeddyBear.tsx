"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TeddyBearProps {
  isPasswordFocused: boolean;
  isTyping: boolean;
}

export default function TeddyBear({ isPasswordFocused, isTyping }: TeddyBearProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isPasswordFocused || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const svgCenterX = rect.left + rect.width / 2;
      const svgCenterY = rect.top + rect.height * 0.4;
      const dx = e.clientX - svgCenterX;
      const dy = e.clientY - svgCenterY;
      const maxOffset = 4;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const clamp = Math.min(dist, 300) / 300;
      setEyeOffset({
        x: (dx / dist) * maxOffset * clamp,
        y: (dy / dist) * maxOffset * clamp,
      });
    },
    [isPasswordFocused]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const activeOffset = isPasswordFocused ? { x: 0, y: 0 } : eyeOffset;
  const lPupilX = 80 + activeOffset.x;
  const lPupilY = 83 + activeOffset.y;
  const rPupilX = 120 + activeOffset.x;
  const rPupilY = 83 + activeOffset.y;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      width="160"
      height="160"
      className="mx-auto transition-all duration-300"
    >
      {/* Left Ear */}
      <circle cx="60" cy="50" r="28" fill="#8B6914" />
      <circle cx="60" cy="50" r="18" fill="#D4A54A" />

      {/* Right Ear */}
      <circle cx="140" cy="50" r="28" fill="#8B6914" />
      <circle cx="140" cy="50" r="18" fill="#D4A54A" />

      {/* Head */}
      <circle cx="100" cy="90" r="55" fill="#C4903D" />

      {/* Face / Muzzle area */}
      <ellipse cx="100" cy="110" rx="30" ry="22" fill="#E8C87A" />

      {/* Eyes - visible when NOT password focused */}
      <g
        className="transition-opacity duration-500"
        style={{
          opacity: isPasswordFocused ? 0 : 1,
        }}
      >
        {/* Left Eye */}
        <ellipse cx="78" cy="82" rx="8" ry="9" fill="white" />
        <circle cx={lPupilX} cy={lPupilY} r="5" fill="#2D1B00" className="transition-all duration-100" />
        <circle cx={lPupilX + 1.5} cy={lPupilY - 1.5} r="2" fill="white" />

        {/* Right Eye */}
        <ellipse cx="122" cy="82" rx="8" ry="9" fill="white" />
        <circle cx={rPupilX} cy={rPupilY} r="5" fill="#2D1B00" className="transition-all duration-100" />
        <circle cx={rPupilX + 1.5} cy={rPupilY - 1.5} r="2" fill="white" />
      </g>

      {/* Closed eyes / squint lines - visible WHEN password focused */}
      <g
        className="transition-all duration-500"
        style={{
          opacity: isPasswordFocused ? 1 : 0,
        }}
      >
        {/* Left closed eye */}
        <path
          d="M70 84 Q78 90 86 84"
          fill="none"
          stroke="#2D1B00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Right closed eye */}
        <path
          d="M114 84 Q122 90 130 84"
          fill="none"
          stroke="#2D1B00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Paws covering eyes - animate in when password focused */}
      <g
        className="transition-all duration-500 ease-in-out"
        style={{
          transform: isPasswordFocused
            ? "translateY(0px)"
            : "translateY(60px)",
          opacity: isPasswordFocused ? 1 : 0,
        }}
      >
        {/* Left Paw */}
        <ellipse cx="68" cy="82" rx="22" ry="16" fill="#C4903D" />
        <ellipse cx="60" cy="79" rx="6" ry="5" fill="#A67B2E" />
        <ellipse cx="70" cy="76" rx="6" ry="5" fill="#A67B2E" />
        <ellipse cx="80" cy="79" rx="6" ry="5" fill="#A67B2E" />
        <ellipse cx="68" cy="86" rx="10" ry="8" fill="#D4A54A" />

        {/* Right Paw */}
        <ellipse cx="132" cy="82" rx="22" ry="16" fill="#C4903D" />
        <ellipse cx="120" cy="79" rx="6" ry="5" fill="#A67B2E" />
        <ellipse cx="130" cy="76" rx="6" ry="5" fill="#A67B2E" />
        <ellipse cx="140" cy="79" rx="6" ry="5" fill="#A67B2E" />
        <ellipse cx="132" cy="86" rx="10" ry="8" fill="#D4A54A" />
      </g>

      {/* Nose */}
      <ellipse cx="100" cy="104" rx="8" ry="5" fill="#2D1B00" />
      <ellipse cx="98" cy="103" rx="2.5" ry="1.5" fill="#5C3D1A" opacity="0.5" />

      {/* Mouth */}
      <path
        d="M93 112 Q100 120 107 112"
        fill="none"
        stroke="#2D1B00"
        strokeWidth="2"
        strokeLinecap="round"
        className="transition-all duration-300"
        style={{
          d: isTyping
            ? "path('M95 112 Q100 116 105 112')"
            : undefined,
        }}
      />
      <line x1="100" y1="109" x2="100" y2="112" stroke="#2D1B00" strokeWidth="1.5" />

      {/* Blush */}
      <circle cx="65" cy="98" r="8" fill="#FFB6C1" opacity="0.3" />
      <circle cx="135" cy="98" r="8" fill="#FFB6C1" opacity="0.3" />

      {/* Body */}
      <ellipse cx="100" cy="168" rx="45" ry="32" fill="#C4903D" />
      <ellipse cx="100" cy="170" rx="28" ry="20" fill="#E8C87A" />

      {/* Left Arm */}
      <ellipse
        cx="55"
        cy="155"
        rx="14"
        ry="22"
        fill="#C4903D"
        transform="rotate(-15 55 155)"
      />

      {/* Right Arm */}
      <ellipse
        cx="145"
        cy="155"
        rx="14"
        ry="22"
        fill="#C4903D"
        transform="rotate(15 145 155)"
      />

      {/* Feet */}
      <ellipse cx="75" cy="192" rx="18" ry="10" fill="#8B6914" />
      <ellipse cx="125" cy="192" rx="18" ry="10" fill="#8B6914" />
      <ellipse cx="75" cy="192" rx="10" ry="6" fill="#D4A54A" />
      <ellipse cx="125" cy="192" rx="10" ry="6" fill="#D4A54A" />
    </svg>
  );
}
