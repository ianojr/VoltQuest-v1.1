/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { CircuitComponent, Point, ComponentType } from '../types';
import { Zap, Activity, Lightbulb, ChevronRight, Microchip, Brain, Cpu } from 'lucide-react';

interface CircuitCanvasProps {
  isRunning: boolean;
  recipe?: string | null;
}

export function CircuitCanvas({ isRunning, recipe }: CircuitCanvasProps) {
  const getDefaultComponents = useCallback((recipeId: string | null | undefined): CircuitComponent[] => {
    if (recipeId === 'circuits-basics') {
      return [
        {
            id: 'bat-1', type: 'battery', position: { x: 100, y: 250 }, value: 9, label: '9V Battery', rotation: 0,
            pins: [{ id: 'p1', componentId: 'bat-1', label: '+', relativePos: { x: -40, y: 0 } }, { id: 'p2', componentId: 'bat-1', label: '-', relativePos: { x: 40, y: 0 } }]
        },
        {
            id: 'res-1', type: 'resistor', position: { x: 300, y: 150 }, value: 1000, label: 'R1 (1kΩ)', rotation: 0,
            pins: [{ id: 'p3', componentId: 'res-1', relativePos: { x: -40, y: 0 } }, { id: 'p4', componentId: 'res-1', relativePos: { x: 40, y: 0 } }]
        },
        {
            id: 'res-2', type: 'resistor', position: { x: 300, y: 350 }, value: 2000, label: 'R2 (2kΩ)', rotation: 0,
            pins: [{ id: 'p5', componentId: 'res-2', relativePos: { x: -40, y: 0 } }, { id: 'p6', componentId: 'res-2', relativePos: { x: 40, y: 0 } }]
        }
      ];
    }

    if (recipeId === 'diodes-rectifiers') {
        return [
          {
              id: 'bat-ac', type: 'battery', position: { x: 100, y: 250 }, value: 12, label: 'AC Source', rotation: 0,
              pins: [{ id: 'p1', componentId: 'bat-ac', label: 'L', relativePos: { x: -40, y: 0 } }, { id: 'p2', componentId: 'bat-ac', label: 'N', relativePos: { x: 40, y: 0 } }]
          },
          {
              id: 'd-1', type: 'led', position: { x: 300, y: 250 }, value: 0.7, label: 'Rectifier Diode', rotation: 0,
              pins: [{ id: 'p3', componentId: 'd-1', label: 'A', relativePos: { x: -40, y: 0 } }, { id: 'p4', componentId: 'd-1', label: 'K', relativePos: { x: 40, y: 0 } }]
          },
          {
              id: 'res-load', type: 'resistor', position: { x: 500, y: 250 }, value: 1000, label: 'Load R', rotation: 0,
              pins: [{ id: 'p5', componentId: 'res-load', relativePos: { x: -40, y: 0 } }, { id: 'p6', componentId: 'res-load', relativePos: { x: 40, y: 0 } }]
          }
        ];
    }

    if (recipeId === 'bjt-mastery') {
        return [
          {
              id: 'bat-vcc', type: 'battery', position: { x: 100, y: 150 }, value: 10, label: 'Vcc (10V)', rotation: 0,
              pins: [{ id: 'p1', componentId: 'bat-vcc', label: '+', relativePos: { x: -40, y: 0 } }, { id: 'p2', componentId: 'bat-vcc', label: '-', relativePos: { x: 40, y: 0 } }]
          },
          {
              id: 'trans-npn', type: 'transistor', position: { x: 300, y: 250 }, value: 100, label: 'NPN Transistor', rotation: 0,
              pins: [{ id: 'p7', componentId: 'trans-npn', label: 'B', relativePos: { x: -40, y: 0 } }, { id: 'p8', componentId: 'trans-npn', label: 'C', relativePos: { x: 20, y: -30 } }, { id: 'p9', componentId: 'trans-npn', label: 'E', relativePos: { x: 20, y: 30 } }]
          },
          {
              id: 'res-col', type: 'resistor', position: { x: 300, y: 100 }, value: 4700, label: 'Rc (4.7kΩ)', rotation: 90,
              pins: [{ id: 'p3', componentId: 'res-col', relativePos: { x: 0, y: -40 } }, { id: 'p4', componentId: 'res-col', relativePos: { x: 0, y: 40 } }]
          }
        ];
    }

    if (recipeId === 'opamps-analog') {
        return [
          {
              id: 'op-1', type: 'op-amp', position: { x: 300, y: 250 }, value: 100000, label: '741 Op-Amp', rotation: 0,
              pins: [{ id: 'p10', componentId: 'op-1', label: '-', relativePos: { x: -40, y: -20 } }, { id: 'p11', componentId: 'op-1', label: '+', relativePos: { x: -40, y: 20 } }, { id: 'p12', componentId: 'op-1', label: 'OUT', relativePos: { x: 40, y: 0 } }]
          },
          {
              id: 'res-fb', type: 'resistor', position: { x: 300, y: 150 }, value: 100000, label: 'Rf (100kΩ)', rotation: 0,
              pins: [{ id: 'p3', componentId: 'res-fb', relativePos: { x: -40, y: 0 } }, { id: 'p4', componentId: 'res-fb', relativePos: { x: 40, y: 0 } }]
          }
        ];
    }

    // Default basic kit
    return [
        {
          id: 'bat-1',
          type: 'battery',
          position: { x: 100, y: 250 },
          value: 9,
          label: '9V Battery',
          rotation: 0,
          pins: [
            { id: 'p1', componentId: 'bat-1', label: '+', relativePos: { x: -40, y: 0 } },
            { id: 'p2', componentId: 'bat-1', label: '-', relativePos: { x: 40, y: 0 } }
          ]
        },
        {
            id: 'res-1',
            type: 'resistor',
            position: { x: 300, y: 150 },
            value: 1000,
            label: '1kΩ Resistor',
            rotation: 0,
            pins: [
              { id: 'p3', componentId: 'res-1', relativePos: { x: -40, y: 0 } },
              { id: 'p4', componentId: 'res-1', relativePos: { x: 40, y: 0 } }
            ]
          },
          {
            id: 'led-1',
            type: 'led',
            position: { x: 500, y: 250 },
            value: 2.0,
            label: 'Red LED',
            rotation: 0,
            pins: [
              { id: 'p5', componentId: 'led-1', relativePos: { x: 0, y: -40 } },
              { id: 'p6', componentId: 'led-1', relativePos: { x: 0, y: 40 } }
            ]
          }
      ];
  }, []);

  const [components, setComponents] = useState<CircuitComponent[]>(getDefaultComponents(recipe));

  React.useEffect(() => {
    if (recipe) {
        setComponents(getDefaultComponents(recipe));
    }
  }, [recipe, getDefaultComponents]);

  const handleDrag = useCallback((id: string, point: Point) => {
    setComponents(prev => prev.map(c => 
      c.id === id ? { ...c, position: point } : c
    ));
  }, []);

  const connections = useMemo(() => [
    { from: components[0].id, to: components[1].id },
    { from: components[1].id, to: components[2].id },
    { from: components[2].id, to: components[3].id },
    { from: components[3].id, to: components[0].id },
  ], [components]);

  return (
    <div className="relative w-full h-full overflow-hidden cursor-crosshair select-none">
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#141414" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Render Wires */}
        {connections.map((conn, idx) => {
          const c1 = components.find(c => c.id === conn.from);
          const c2 = components.find(c => c.id === conn.to);
          if (!c1 || !c2) return null;

          return (
            <g key={`wire-${idx}`}>
              <line 
                x1={c1.position.x} y1={c1.position.y} 
                x2={c2.position.x} y2={c2.position.y} 
                stroke="#141414" 
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {isRunning && (
                <motion.circle
                  r="3.5"
                  fill="#F27D26"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "linear",
                    delay: idx * 0.3
                  }}
                  style={{ 
                      offsetPath: `path('M ${c1.position.x} ${c1.position.y} L ${c2.position.x} ${c2.position.y}')`
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Render Components */}
        {components.map((comp) => (
          <ComponentNode 
            key={comp.id} 
            component={comp} 
            onDrag={(p) => handleDrag(comp.id, p)}
            isSelected={false}
            isRunning={isRunning}
          />
        ))}
      </svg>
      
      <div className="absolute top-4 right-4 flex flex-col gap-2">
         <div className="p-3 bg-white/90 border-2 border-[#141414] text-[10px] font-mono font-black uppercase tracking-widest shadow-[4px_4px_0px_#141414]">
            Lab Canvas // Active
         </div>
      </div>
    </div>
  );
}

function ComponentNode({ component, onDrag, isSelected, isRunning }: { 
  component: CircuitComponent, 
  onDrag: (p: Point) => void,
  isSelected: boolean,
  isRunning: boolean,
  key?: string
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (component.type) {
      case 'battery': return <Zap size={28} strokeWidth={2.5} />;
      case 'resistor': return <Activity size={28} strokeWidth={2.5} />;
      case 'led': return <Lightbulb size={28} strokeWidth={2.5} className={isRunning ? 'text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]' : ''} />;
      case 'switch': return <ChevronRight size={28} strokeWidth={2.5} />;
      case 'transistor': return <Microchip size={28} strokeWidth={2.5} />;
      case 'logic-gate': return <Brain size={28} strokeWidth={2.5} />;
      case 'op-amp': return <Cpu size={28} strokeWidth={2.5} />;
      default: return null;
    }
  };

  return (
    <motion.g
      drag
      dragMomentum={false}
      onDrag={(_, info) => onDrag({ x: component.position.x + info.delta.x, y: component.position.y + info.delta.y })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-move pointer-events-auto"
    >
      <foreignObject 
        x={component.position.x - 50} 
        y={component.position.y - 50} 
        width="100" 
        height="120"
      >
        <div className="flex flex-col items-center justify-center h-full group">
          <div className={`p-4 border-2 transition-all duration-200 ${
            isHovered || isSelected 
                ? 'border-[#F27D26] bg-[#F27D26]/10 transform -translate-y-1' 
                : 'border-[#141414] bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)]'
          } rounded-sm overflow-hidden relative`}>
            {getIcon()}
            {isHovered && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F27D26]"></div>
            )}
          </div>
          <div className="mt-3 text-[11px] font-mono font-black uppercase tracking-tighter whitespace-nowrap bg-[#141414] text-white px-2 py-0.5">
            {component.label}
          </div>
          <div className="text-[9px] font-mono font-bold opacity-50 uppercase mt-1 tracking-widest">
             {component.value}{component.type === 'resistor' ? 'Ω' : component.type === 'battery' ? 'V' : ''}
          </div>
        </div>
      </foreignObject>

      {/* Connection Points */}
      {component.pins.map(pin => (
        <g key={pin.id} className="group/pin">
            <circle 
                cx={component.position.x + pin.relativePos.x}
                cy={component.position.y + pin.relativePos.y}
                r="6"
                fill="white"
                stroke="#141414"
                strokeWidth="2"
                className="group-hover/pin:fill-[#F27D26] group-hover/pin:stroke-[#F27D26] transition-colors cursor-pointer"
            />
            {pin.label && (
                <text
                    x={component.position.x + pin.relativePos.x}
                    y={component.position.y + pin.relativePos.y - 12}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-black fill-[#141414] opacity-0 group-hover/pin:opacity-100 transition-opacity uppercase"
                >
                    {pin.label}
                </text>
            )}
        </g>
      ))}
    </motion.g>
  );
}
