import React from 'react';

interface BadgeProps {
  variant?: 'lime' | 'amber' | 'ink' | 'tomato' | 'gray' | 'white';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'lime', children, className = '' }) => {
  const baseStyle = "font-inter font-medium text-[12px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-lg border-[1.5px] border-ink inline-flex items-center justify-center";
  
  const variants = {
    lime: "bg-acid-lime text-ink",
    amber: "bg-amber text-ink",
    ink: "bg-ink text-acid-lime",
    tomato: "bg-tomato text-ink",
    gray: "bg-gray-200 text-gray-600",
    white: "bg-white text-ink",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};