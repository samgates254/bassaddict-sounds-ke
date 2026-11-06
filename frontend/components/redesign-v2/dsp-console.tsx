"use client";

import { useState } from "react";
import { Sliders, Volume2, Sparkles, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";

interface Band {
  freq: string;
  label: string;
  defaultDb: number;
}

const defaultBands: Band[] = [
  { freq: "50Hz", label: "Sub-Bass", defaultDb: 6 },
  { freq: "125Hz", label: "Mid-Bass", defaultDb: 4 },
  { freq: "315Hz", label: "Low-Mid", defaultDb: 1 },
  { freq: "750Hz", label: "Vocal Body", defaultDb: 0 },
  { freq: "2.2kHz", label: "Presence", defaultDb: 2 },
  { freq: "6.0kHz", label: "Clarity", defaultDb: 5 },
  { freq: "16kHz", label: "Air/Sparkle", defaultDb: 3 },
];

export function DspParametricConsole() {
  const [bands, setBands] = useState<number[]>(defaultBands.map((b) => b.defaultDb));
  const [activePreset, setActivePreset] = useState<"custom" | "bass" | "vocal" | "spl">("bass");

  const handleSliderChange = (index: number, val: number) => {
    const next = [...bands];
    next[index] = val;
    setBands(next);
    setActivePreset("custom");
  };

  const applyPreset = (preset: "bass" | "vocal" | "spl") => {
    setActivePreset(preset);
    if (preset === "bass") {
      setBands([8, 6, 2, 0, 1, 3, 2]);
    } else if (preset === "vocal") {
      setBands([2, 2, 1, 4, 6, 6, 4]);
    } else if (preset === "spl") {
      setBands([10, 8, 3, 1, 2, 4, 3]);
    }
  };

  const resetFlat = () => {
    setBands([0, 0, 0, 0, 0, 0, 0]);
    setActivePreset("custom");
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#090D09] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      {/* Console Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-[#A8FF00]/40 bg-[#A8FF00]/10 text-[#A8FF00]">
            <Sliders className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#A8FF00]">
                BASSADICT DSP TELEMETRY
              </span>
              <span className="size-1.5 rounded-full bg-[#A8FF00] animate-ping" />
            </div>
            <h3 className="text-lg font-black uppercase text-white font-display">
              7-Band Parametric Equalization Bay
            </h3>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 p-1 text-xs">
          <button
            type="button"
            onClick={() => applyPreset("bass")}
            className={`rounded px-3 py-1 font-mono font-bold transition ${
              activePreset === "bass" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
            }`}
          >
            BASS PUNCH
          </button>
          <button
            type="button"
            onClick={() => applyPreset("vocal")}
            className={`rounded px-3 py-1 font-mono font-bold transition ${
              activePreset === "vocal" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
            }`}
          >
            VOCAL STAGE
          </button>
          <button
            type="button"
            onClick={() => applyPreset("spl")}
            className={`rounded px-3 py-1 font-mono font-bold transition ${
              activePreset === "spl" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
            }`}
          >
            SPL PEAK
          </button>
          <button
            type="button"
            onClick={resetFlat}
            className="rounded px-2.5 py-1 text-stone-500 hover:text-stone-300 font-mono text-[11px]"
          >
            FLAT
          </button>
        </div>
      </div>

      {/* 7 Slider Strips */}
      <div className="mt-8 grid grid-cols-7 gap-2 sm:gap-4 items-end">
        {defaultBands.map((band, idx) => {
          const val = bands[idx];
          return (
            <div key={band.freq} className="flex flex-col items-center gap-3">
              {/* dB readout */}
              <span
                className={`font-mono text-xs font-bold ${
                  val > 0 ? "text-[#A8FF00]" : val < 0 ? "text-amber-400" : "text-stone-400"
                }`}
              >
                {val > 0 ? `+${val}` : val}dB
              </span>

              {/* Slider Track */}
              <div className="relative flex h-36 sm:h-44 w-7 sm:w-10 items-center justify-center rounded-lg border border-white/10 bg-black/80 py-2">
                {/* Center 0dB Reference Line */}
                <span className="absolute inset-x-1 top-1/2 h-[1px] bg-white/20" />

                {/* Range Input Rotated */}
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="1"
                  value={val}
                  onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                  className="h-32 sm:h-40 w-2 cursor-pointer appearance-none bg-transparent accent-[#A8FF00] [writing-mode:vertical-lr] [direction:rtl]"
                  aria-label={`${band.label} (${band.freq})`}
                />
              </div>

              {/* Frequency Label */}
              <div className="text-center">
                <p className="font-mono text-[11px] sm:text-xs font-bold text-white">{band.freq}</p>
                <p className="hidden sm:block text-[9px] uppercase tracking-wider text-stone-400">{band.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acoustic Insights Footnote */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-[#A8FF00] shrink-0" />
          <span>
            Calibrated on Luthuli Avenue with Boschmann 7-Band Parametric EQ &amp; Sony In-Dash DSP.
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#A8FF00]">
          Total THD Distortion: &lt; 0.05% at Rated Load
        </span>
      </div>
    </div>
  );
}
