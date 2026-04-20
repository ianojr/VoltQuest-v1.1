import { Section } from './types';

export const SYLLABUS: Section[] = [
  {
    id: 'circuits-basics',
    title: 'Unit 1: Circuit Foundations',
    summary: 'Mastering Current, Voltage, and Kirchhoff’s Laws with simple analogies.',
    theory: [
      'Current (I): The flow of charge. Think of it as the flow rate of water in a pipe (Gallons per minute). Measured in Amperes (A).',
      'Voltage (V): Pressure that pushes electrons. Think of it as water pressure from a pump or height of a tank. Measured in Volts (V).',
      'Resistance (R): Opposition to flow. Like a faucet or a narrow, rough pipe. Measured in Ohms (Ω).',
      'Kirchhoff Current Law (KCL): Total current Entering a node = Total current Leaving. Like a pipe junction where no water is lost.',
      'Kirchhoff Voltage Law (KVL): Sum of voltages around a loop is zero. Like a mountain hike where you end at the same elevation you started.'
    ],
    quiz: [
      {
        id: 'c1-1',
        question: 'If 3A enters a junction and 1A leaves via one path, how much leaves via the second path?',
        options: ['1A', '2A', '4A', '0A'],
        correctIndex: 1,
        explanation: 'By KCL, 3A (In) = 1A (Out 1) + I (Out 2). Thus, I = 2A.'
      }
    ]
  },
  {
    id: 'network-theorems',
    title: 'Unit 2: Network Theorems',
    summary: 'Thevenin, Norton, and Superposition: Tools to simplify any complex circuit.',
    theory: [
      'Thevenin’s Theorem: Any complex circuit can be reduced to one Voltage source (Vth) and one series resistor (Rth).',
      'Norton’s Theorem: Any complex circuit can be reduced to one Current source (In) and one parallel resistor (Rn).',
      'Superposition: In a circuit with multiple sources, calculate the effect of each source individually while others are "killed" (Short voltage, Open current), then add the results.',
      'Source Transformation: A voltage source (V) with series R is equivalent to a current source (I = V/R) with parallel R.'
    ],
    quiz: [
      {
        id: 'nt-1',
        question: 'When using superposition, how do you treat an ideal voltage source that you are NOT currently analyzing?',
        options: ['Open Circuit', 'Keep as is', 'Short Circuit', 'Replace with resistor'],
        correctIndex: 2,
        explanation: 'Voltage sources are replaced by their internal resistance (0 for ideal), which is a short circuit.'
      }
    ]
  },
  {
    id: 'passives-reactance',
    title: 'Unit 3: Passives, Reactance & Impedance',
    summary: 'Deep dive into Capacitors (Energy in E-field) and Inductors (Energy in B-field).',
    theory: [
      'Capacitor (C): Opposes change in Voltage. Like a water tank with a rubber diaphragm. Stores energy in an Electrostatic Field.',
      'Inductor (L): Opposes change in Current. Like a heavy flywheel or a long coiled hose (electrical momentum). Stores energy in a Magnetic Field.',
      'Reactance (X): Opposition to AC flow. Xc = 1/(2πfC) for Capacitors; XL = 2πfL for Inductors.',
      'Impedance (Z): Combined resistance and reactance. Z = √(R² + X²).',
      'Phase: In a Capacitor, Current LEADS Voltage (ELI the ICE man). In an Inductor, Voltage LEADS Current.'
    ],
    quiz: [
      {
        id: 'pr-1',
        question: 'What happens to the reactance of a capacitor as the AC frequency increases?',
        options: ['Increases', 'Decreases', 'Remains same', 'Goes to infinity'],
        correctIndex: 1,
        explanation: 'According to Xc = 1/(2πfC), as frequency (f) goes up, reactance goes down.'
      }
    ]
  },
  {
    id: 'band-theory',
    title: 'Unit 4: Band Theory of Solids',
    summary: 'Physics of why some materials conduct and others do not.',
    theory: [
      'Energy Bands: Continuous ranges of energy levels. Valence Band (full/low) and Conduction Band (empty/high).',
      'Forbidden Gap (Eg): The "No-go" zone for electrons. Metals overlap (Eg=0), Semiconductors have small gaps (~1eV), Insulators have large gaps (>3eV).',
      'Intrinsic Carriers: Conductivity depends on temperature. Formula: ni = no * exp(-Eg / (2kT)).',
      'Temperature Effect: As temperature rises, more valence electrons jump to the conduction band, increasing semiconductor conductivity.'
    ],
    quiz: [
      {
        id: 'bt-1',
        question: 'What is the energy gap (Eg) of a typical insulator?',
        options: ['0 eV', '1.1 eV', '> 3 eV', '-1 eV'],
        correctIndex: 2,
        explanation: 'Insulators have very large gaps, making it almost impossible for electrons to move to the conduction band.'
      }
    ]
  },
  {
    id: 'semiconductors',
    title: 'Unit 5: Extrinsic Semiconductors',
    summary: 'Doping basics: Creating N-type and P-type materials.',
    theory: [
      'Doping: Adding tiny impurities (1 ppm) to pure Silicon to increase carriers.',
      'N-Type: Doped with Pentavalent atoms (Phosphorus). Extra "Negative" electrons. Majority carrier = Electrons.',
      'P-Type: Doped with Trivalent atoms (Boron). Extra "Positive" holes. Majority carrier = Holes.',
      'Mass Action Law: np = ni². If electrons go up, holes go down via recombination.',
      'Overall Neutrality: Even though there are more free carriers, the whole crystal remains electrically neutral.'
    ],
    quiz: [
      {
        id: 'sc-1',
        question: 'Which atom would you use to dope Silicon to create N-type material?',
        options: ['Boron (3 valance)', 'Aluminum (3 valance)', 'Phosphorus (5 valance)', 'Silicon itself'],
        correctIndex: 2,
        explanation: 'Pentavalent atoms like Phosphorus provide the extra free electron needed for N-type.'
      }
    ]
  },
  {
    id: 'diodes-rectifiers',
    title: 'Unit 6: Diodes & Power Conversion',
    summary: 'PN Junctions, Zener regulation, and Rectifier circuits.',
    theory: [
      'PN Junction: Formation of "Depletion Region" (a barrier). Forward bias shrinks it; Reverse bias expands it.',
      'The Diode: Like a Check Valve. Conducts when Vd > 0.7V (Silicon).',
      'Shockley Equation: Id = Is * (exp(Vd/VT) - 1). Current grows exponentially with voltage.',
      'Zener Diode: Designed to operate in "Breakdown". Used for voltage regulation.',
      'Rectification: Converting AC to DC. Half-wave uses 1 diode; Full-wave/Bridge uses 4 diodes (efficient/unidirectional).',
      'Smoothing: Using a capacitor filter to reduce AC ripple. Ripple voltage ≈ Vp / (fRC).'
    ],
    quiz: [
      {
        id: 'dr-1',
        question: 'What is the main advantage of a full-wave bridge rectifier over a half-wave one?',
        options: ['Cheaper', 'Allows current flow on both half cycles', 'Uses less diodes', 'Slows down electrons'],
        correctIndex: 1,
        explanation: 'Full-wave rectifiers utilize both the positive and negative cycles, significantly increasing efficiency.'
      }
    ]
  },
  {
    id: 'bjt-mastery',
    title: 'Unit 7: BJT & Biasing',
    summary: 'Mastering NPN/PNP action and the 3 core biasing circuits (Fixed, Feedback, Divider).',
    theory: [
      'BJT Action: Collector current (Ic) is almost equal to Emitter current (Ie). Base current (Ib) is just the "control signal".',
      'Fixed Bias: Simple but unstable. Ib = (Vcc - Vbe) / Rb. Highly dependent on Beta.',
      'Collector Feedback: Self-stabilizing. If Ic rises, Vc drops, reducing Ib and pulling Ic back down. A form of negative feedback.',
      'Voltage Divider Bias: The king of stability. Base voltage (Vb) is fixed by a divider, making the circuit independent of Beta variations.',
      'Efficiency: Class A (Q-point in middle, 25-50% efficient, low distortion) vs Class B (Q-point at cutoff, 78.5% efficient, crossover distortion).'
    ],
    quiz: [
      {
        id: 'bj-1',
        question: 'Which biasing method is least dependent on the Transistor’s Beta (β) value?',
        options: ['Fixed Bias', 'Collector Feedback', 'Voltage Divider Bias', 'No Bias'],
        correctIndex: 2,
        explanation: 'Voltage Divider Bias uses external resistors to set the base potential, making it much more stable against transistor variations.'
      }
    ]
  },
  {
    id: 'identification',
    title: 'Unit 11: Hardware & Identification',
    summary: 'Reading Color Codes and identifying real-world PCB components.',
    theory: [
      'Resistor Color Code: Bad Boys Ravage Our Young Girls Behind Victory Garden Walls (Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Grey=8, White=9).',
      'Tolerance: Gold = 5%, Silver = 10%.',
      'Capacitor Codes: 104 = 10 + 4 zeros = 100,000 pF = 0.1 μF.',
      'Soldering: Eutectic point (63/37 Tin-Lead mix) has the lowest melting point and highest reliability for electronic glue.'
    ],
    quiz: [
      {
        id: 'id-1',
        question: 'What is the value of a resistor with bands: Yellow, Violet, Orange, Gold?',
        options: ['4.7 kΩ', '47 kΩ', '470 Ω', '470 kΩ'],
        correctIndex: 1,
        explanation: 'Yellow(4), Violet(7), Orange(x1000) = 47,000 Ω = 47 kΩ. Gold is 5% tolerance.'
      }
    ]
  },
  {
    id: 'mosfet-cmos',
    title: 'Unit 8: MOSFET & Digital Logic',
    summary: 'Voltage-controlled switches and the foundation of modern computers.',
    theory: [
      'FET vs BJT: FET is Voltage-controlled (infinite input R). BJT is Current-controlled.',
      'MOSFET Structure: Gate is insulated by SiO2. No DC current flows into the gate!',
      'Enhancement Mode (E-MOSFET): Off by default. Needs threshold voltage (VT) to create a channel.',
      'CMOS Technology: Uses pair of NMOS and PMOS. Consumes zero power when static. Found in all microchips.',
      'Gate Logic: NAND is the "Universal Gate". XOR (XNOR) is used for parity checks and math.'
    ],
    quiz: [
      {
        id: 'mc-1',
        question: 'Why does a MOSFET have a higher input impedance than a BJT?',
        options: ['It uses more gold', 'The gate is insulated by oxide', 'It is bigger', 'It has less current'],
        correctIndex: 1,
        explanation: 'The SiO2 layer creates a perfect insulator between the gate and the channel.'
      }
    ]
  },
  {
    id: 'opamps-analog',
    title: 'Unit 9: Operational Amplifiers',
    summary: 'The "Ideal" amplifier and mathematical signal processing.',
    theory: [
      'Ideal Op-Amp: Infinite Gain, Infinite Input Impedance (Zi), Zero Output Impedance (Zo).',
      'Negative Feedback: Connecting output back to Inverting (-) input. Stabilizes gain.',
      'Virtual Ground: Because gain is infinite, the voltage difference between (+) and (-) terminals is zero.',
      'Circuits: Inverting (gain = -Rf/R), Non-inverting (gain = 1 + Rf/R), Summer, Integrator (uses Capacitor in feedback).',
      'Saturation: Output cannot exceed the power supply rails (V+ / V-).'
    ],
    quiz: [
      {
        id: 'oa-1',
        question: 'In an inverting op-amp, if Rf = 100kΩ and R1 = 10kΩ, what is the voltage gain?',
        options: ['10', '-10', '11', '0.1'],
        correctIndex: 1,
        explanation: 'Gain G = -Rf / R1 = -100k / 10k = -10.'
      }
    ]
  },
  {
    id: 'machines-telecom',
    title: 'Unit 10: Machines & Telecom',
    summary: 'Power generation, Transformers, and Modulation.',
    theory: [
      'DC Generator: Converts movement to power using Faradays Law. Uses split-rings (commutator).',
      'Transformer: Steps voltage UP or DOWN using magnetic flux. Power (P=VI) stays constant.',
      'Modulation: Superimposing a signal on a high-frequency carrier wave.',
      'AM vs FM: AM is Amplitude Modulation (simple but noisy). FM is Frequency Modulation (clearer but complex).',
      'Communication elements: Transmitter, Channel (Media), and Receiver.'
    ],
    quiz: [
      {
        id: 'mt-1',
        question: 'What happens to current if a transformer steps up the voltage by a factor of 10?',
        options: ['Increases 10x', 'Decreases 10x', 'Stays same', 'Goes to zero'],
        correctIndex: 1,
        explanation: 'Since P = V * I must be constant, if V goes up 10x, I must drop 10x.'
      }
    ]
  }
];
