import { useState, useEffect } from 'react';

export const useCountdown = (expiresAt: number) => {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, expiresAt - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, expiresAt - Date.now());
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const isExpired = timeLeft <= 0;
  
  // Format menjadi MM:SS
  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  const isCritical = timeLeft > 0 && timeLeft <= 60000; // Kurang dari 1 menit
  const isWarning = timeLeft > 60000 && timeLeft <= 300000; // 1-5 menit

  return { timeLeft, formatted, isExpired, isCritical, isWarning };
};