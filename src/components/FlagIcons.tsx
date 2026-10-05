"use client";

import React from "react";

export function IndonesiaFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2px] shadow-sm inline-block shrink-0 overflow-hidden border border-slate-700/50`}
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#e70011" d="M0 0h640v240H0z" />
        <path fill="#ffffff" d="M0 240h640v240H0z" />
      </g>
    </svg>
  );
}

export function UKFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[2px] shadow-sm inline-block shrink-0 overflow-hidden border border-slate-700/50`}
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#FFF" d="m75 0 245 180L565 0h75v50L395 240l245 190v50h-75L320 300 75 480H0v-50l245-190L0 50V0h75z" />
      <path fill="#C8102E" d="m424 261 216 164v25h-32L393 286l31-25zm-184 0-31 25-215 164H0v-25l216-164h24zM640 30l-216 164-31-25L608 0h32v30zM0 30v-30h32l216 164-31 25L0 30z" />
      <path fill="#FFF" d="M240 0v480h160V0H240zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M267 0v480h106V0H267zM0 187v106h640V187H0z" />
    </svg>
  );
}
