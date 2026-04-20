/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ComponentType = 'battery' | 'resistor' | 'led' | 'switch' | 'wire' | 'ground' | 'multimeter' | 'transistor' | 'logic-gate' | 'op-amp';

export type GateType = 'NAND' | 'XNOR' | 'AND' | 'OR' | 'NOT';

export interface Point {
  x: number;
  y: number;
}

export interface CircuitComponent {
  id: string;
  type: ComponentType;
  subType?: string; // e.g., 'NPN', 'PNP' for transistors or GateType for gates
  position: Point;
  value: number; // Resistance, Voltage, Gain, etc.
  label: string;
  pins: Pin[];
  rotation: number;
}

export interface Pin {
  id: string;
  componentId: string;
  label?: string; // 'Base', 'Collector', 'Emitter', 'In+', 'In-', 'Out'
  relativePos: Point;
  connectedToPinId?: string;
}

export interface Section {
  id: string;
  title: string;
  summary: string;
  theory: string[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
