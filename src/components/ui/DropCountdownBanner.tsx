import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

const getNextFridayDrop = () => {
  const now = new Date();
  const target = new Date(now);
  // 5 = Jumat (0 = Minggu)
  const day = now.getDay();
  let daysUntilFriday = (5 - day + 7) % 7;

  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(19, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target.getTime();
};

export const DropCountdownBanner: React.FC = () => {
  const [targetTime] = useState(() => getNextFridayDrop());
  const [remaining, setRemaining] = useState(() => Math.max(0, targetTime - Date.now()));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(Math.max(0, targetTime - Date.now()));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  const totalSec = Math.floor(remaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return (
    <div className="bg-ink text-white border-[1.5px] border-ink rounded-2xl p-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-brutal-sm">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-tomato flex items-center justify-center shrink-0">
          <Flame size={18} className="text-white" />
        </div>
        <div>
          <span className="font-mono text-[11px] uppercase text-acid-lime block">
            WEEKLY DROP SCHEDULE
          </span>
          <p className="font-grotesk font-bold text-sm md:text-base uppercase">
            DROP BARU TIAP JUMAT 19.00 WIB
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono font-bold text-sm">
        {[
          { label: 'HARI', val: days },
          { label: 'JAM', val: hours },
          { label: 'MNT', val: minutes },
          { label: 'DTK', val: seconds },
        ].map((unit) => (
          <div
            key={unit.label}
            className="bg-acid-lime text-ink px-2.5 py-1 rounded-lg border border-ink text-center min-w-[48px]"
          >
            <span className="block text-base leading-none">
              {String(unit.val).padStart(2, '0')}
            </span>
            <span className="text-[9px] tracking-wider">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};