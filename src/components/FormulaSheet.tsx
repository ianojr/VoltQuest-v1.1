import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, Activity, Cpu, RotateCcw } from 'lucide-react';

export function FormulaSheet() {
  const categories = [
    {
      name: 'DC Fundamentals',
      icon: <Zap size={16} />,
      formulas: [
        { label: 'Ohm’s Law', text: 'V = I × R' },
        { label: 'Electrical Power', text: 'P = V × I = I²R = V²/R' },
        { label: 'Kirchhoff’s Current Law', text: 'Σ I_in = Σ I_out' },
        { label: 'Voltage Divider', text: 'V_out = V_in × (R2 / (R1 + R2))' }
      ]
    },
    {
      name: 'Capacitors & Inductors',
      icon: <Activity size={16} />,
      formulas: [
        { label: 'Charge Stored', text: 'Q = C × V' },
        { label: 'Energy (Cap)', text: 'W = ½CV²' },
        { label: 'Capacitive Reactance', text: 'Xc = 1 / (2πfC)' },
        { label: 'Inductive Reactance', text: 'XL = 2πfL' },
        { label: 'Total Z', text: 'Z = √(R² + (XL - Xc)²)' }
      ]
    },
    {
      name: 'Simiconductors & Diodes',
      icon: <Cpu size={16} />,
      formulas: [
        { label: 'Shockley Equation', text: 'Id = Is * (e^(Vd/VT) - 1)' },
        { label: 'Thermal Voltage (VT)', text: 'VT ≈ 26mV @ 300K' },
        { label: 'Ripple Voltage', text: 'Vr ≈ Vp / (fRC)' },
        { label: 'Rectifier Gain (FWR)', text: 'V_dc = (2/π) * V_peak' }
      ]
    },
    {
      name: 'Power & Machines (Unit 10)',
      icon: <Calculator size={16} />,
      formulas: [
        { label: 'Transformer EMF', text: 'E = 4.44 × Φ_max × f × N' },
        { label: 'Turns Ratio', text: 'Vp / Vs = Np / Ns = Is / Ip' },
        { label: 'DC Motor Torque', text: 'τ = (P × Z × Φ × Ia) / (2π × A)' },
        { label: 'Class A Efficiency', text: 'η_max = 25% (Series) - 50% (Transf.)' },
        { label: 'Class B Efficiency', text: 'η_max = 78.5% (theoretical max)' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {categories.map((cat, idx) => (
        <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="border-2 border-[#141414] bg-white p-5 shadow-[8px_8px_0px_#141414]"
        >
            <div className="flex items-center gap-2 mb-4 border-b-2 border-[#141414] pb-2">
                <div className="p-2 bg-[#F27D26] text-white">
                    {cat.icon}
                </div>
                <h3 className="font-mono font-black uppercase text-sm tracking-tight">{cat.name}</h3>
            </div>
            <div className="space-y-4">
                {cat.formulas.map(f => (
                    <div key={f.label} className="group">
                        <div className="text-[10px] uppercase font-bold opacity-40 mb-1">{f.label}</div>
                        <div className="font-mono text-lg font-black tracking-tighter bg-gray-50 p-2 border border-dashed border-[#141414]/20 group-hover:bg-[#F27D26]/5 transition-colors">
                            {f.text}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
      ))}

      <div className="md:col-span-2 border-2 border-[#141414] bg-[#FFECCC] p-5 font-mono text-xs flex gap-4 items-center">
          <div className="text-4xl">⚠️</div>
          <div>
              <p className="font-black">STUDY PRO-TIP:</p>
              <p>For the exam, always remember <strong>"ELI the ICE man"</strong>: Voltage (E) leads Current (I) in an Inductor (L), while Current (I) leads Voltage (E) in a Capacitor (C).</p>
          </div>
      </div>
    </div>
  );
}
