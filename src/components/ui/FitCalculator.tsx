import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

interface FitCalculatorProps {
  measurements: {
    lingkarDada?: number;
    panjang?: number;
    lingkarPinggang?: number;
    bahu?: number;
  };
}

export const FitCalculator: React.FC<FitCalculatorProps> = ({ measurements }) => {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('62');

  const h = Number(height) || 0;
  const w = Number(weight) || 0;

  const getFitResult = () => {
    if (h < 130 || w < 30) return null;

    if (measurements.lingkarDada) {
      // Estimasi lingkar dada tubuh + kelonggaran standar
      const estimatedBodyChest = Math.round(52 + w * 0.62);
      const diff = measurements.lingkarDada - estimatedBodyChest;

      if (diff >= 18) {
        return {
          badge: 'OVERSIZED / BOXY FIT',
          color: 'bg-acid-lime',
          desc: `Lingkar dada baju ${measurements.lingkarDada} cm (selisih +${diff} cm dari estimasi badanmu). Jatuhnya bakal longgar boxy.`,
        };
      }
      if (diff >= 8) {
        return {
          badge: 'RELAXED / PAS NYAMAN',
          color: 'bg-lavender',
          desc: `Lingkar dada baju ${measurements.lingkarDada} cm. Pas nyaman dipakai harian maupun dilayer kaos.`,
        };
      }
      if (diff >= 2) {
        return {
          badge: 'REGULAR / SLIM FIT',
          color: 'bg-amber',
          desc: `Lingkar dada baju ${measurements.lingkarDada} cm. Jatuhnya pas mengikuti bentuk badan.`,
        };
      }
      return {
        badge: 'POTENSI KEKECILAN',
        color: 'bg-tomato text-white',
        desc: `Lingkar dada baju ${measurements.lingkarDada} cm tergolong ketat untuk postur ${h} cm / ${w} kg.`,
      };
    }

    if (measurements.lingkarPinggang) {
      const estimatedWaist = Math.round(46 + w * 0.56);
      const diff = measurements.lingkarPinggang - estimatedWaist;

      if (diff >= 6) {
        return {
          badge: 'LOOSE / BUTUH BELT',
          color: 'bg-acid-lime',
          desc: `Lingkar pinggang ${measurements.lingkarPinggang} cm bakal longgar (baggy) di berat ${w} kg, aman pakai ikat pinggang.`,
        };
      }
      if (diff >= 0) {
        return {
          badge: 'TRUE TO SIZE / PAS',
          color: 'bg-lavender',
          desc: `Lingkar pinggang ${measurements.lingkarPinggang} cm masuk kategori pas untuk posturmu.`,
        };
      }
      return {
        badge: 'TERLALU SEMPIT',
        color: 'bg-tomato text-white',
        desc: `Lingkar pinggang ${measurements.lingkarPinggang} cm kemungkinan kekecilan di bagian perut.`,
      };
    }

    return null;
  };

  const result = getFitResult();

  return (
    <div className="bg-paper border-[1.5px] border-ink rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Ruler size={16} className="text-ink" />
        <h3 className="font-grotesk font-bold text-sm uppercase text-ink">
          Cek Estimasi Fit di Badanmu
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-inter text-[11px] text-gray-600 mb-1">Tinggi (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-white border-[1.5px] border-ink rounded-lg px-3 py-1.5 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block font-inter text-[11px] text-gray-600 mb-1">Berat (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-white border-[1.5px] border-ink rounded-lg px-3 py-1.5 font-mono text-sm"
          />
        </div>
      </div>

      {result && (
        <div className="bg-white border-[1.5px] border-ink rounded-xl p-3">
          <span
            className={`inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-ink mb-1.5 ${result.color}`}
          >
            {result.badge}
          </span>
          <p className="font-inter text-xs text-gray-700 leading-relaxed">{result.desc}</p>
        </div>
      )}
    </div>
  );
};