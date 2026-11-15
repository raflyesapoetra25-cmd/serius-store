import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lime';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled, 
  children, 
  ...props 
}) => {
  const baseStyle = "font-grotesk font-bold uppercase tracking-[0.02em] text-[16px] px-6 py-[14px] rounded-xl border-[1.5px] border-ink transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-ink text-acid-lime shadow-brutal-sm hover:translate-brutal-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    secondary: "bg-white text-ink shadow-brutal-sm hover:translate-brutal-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-paper",
    lime: "bg-acid-lime text-ink shadow-brutal-sm hover:translate-brutal-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  };

  const disabledStyle = "bg-gray-200 text-gray-600 border-ink shadow-none cursor-not-allowed opacity-80";

  const currentStyle = disabled ? disabledStyle : variants[variant];
  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      disabled={disabled}
      className={`${baseStyle} ${currentStyle} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};