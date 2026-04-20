/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Settings, 
  BookOpen, 
  Play, 
  Square, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Info,
  ChevronRight,
  Lightbulb,
  Cpu,
  HelpCircle,
  Activity,
  Microchip,
  Waves,
  Brain,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { SYLLABUS } from './syllabus';
import { CircuitCanvas } from './components/CircuitCanvas';
import { FormulaSheet } from './components/FormulaSheet';
import { Section, QuizQuestion, CircuitComponent } from './types';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [activeTab, setActiveTab] = useState<'lab' | 'theory' | 'quiz' | 'formulas'>('theory');
  const [simulatorRunning, setSimulatorRunning] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section>(SYLLABUS[0]);
  const [activeQuizSection, setActiveQuizSection] = useState<Section>(SYLLABUS[0]);
  const [labRecipe, setLabRecipe] = useState<string | null>(null);

  const loadRecipe = (id: string) => {
    setActiveTab('lab');
    setLabRecipe(id);
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-[#141414] p-4 flex justify-between items-center bg-[#E4E3E0] z-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#141414] text-white p-1.5 rounded">
            <Zap size={20} />
          </div>
          <h1 className="font-mono font-bold tracking-tighter text-xl uppercase">VoltQuest v1.1 // Exam Edition</h1>
        </div>
        <nav className="flex gap-1 bg-[#d4d3d0] p-1 rounded-sm border border-[#141414]">
          {(['lab', 'theory', 'quiz', 'formulas'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-1.5 text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-[#141414] text-white shadow-[2px_2px_0px_rgba(20,20,20,0.3)]' 
                  : 'hover:bg-[#c4c3c0] text-[#141414]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white border border-[#141414] rounded-sm shadow-[2px_2px_0px_#141414]">
            <CheckCircle2 size={12} className="text-green-600" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-tight">Syllabus Loaded</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-white text-xs font-mono ring-2 ring-[#F27D26] ring-offset-2 ring-offset-[#E4E3E0]">
            E1
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar / Tools */}
        <aside className="w-72 border-r border-[#141414] flex flex-col bg-[#E4E3E0]">
          <div className="p-4 border-b border-[#141414] bg-[#d4d3d0]">
            <h2 className="text-[11px] font-mono uppercase font-bold tracking-wider flex items-center gap-2 italic">
               Course Navigator
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {activeTab === 'theory' || activeTab === 'quiz' ? (
              <div className="p-2 space-y-1">
                {SYLLABUS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => activeTab === 'theory' ? setSelectedSection(sec) : setActiveQuizSection(sec)}
                    className={`w-full p-4 text-left border border-transparent hover:border-[#141414] transition-all group relative ${
                      (activeTab === 'theory' && selectedSection.id === sec.id) || (activeTab === 'quiz' && activeQuizSection.id === sec.id)
                        ? 'bg-[#141414] text-white'
                        : 'bg-white/40 hover:bg-white shadow-sm'
                    }`}
                  >
                    <div className="text-[9px] font-mono opacity-50 uppercase mb-1 tracking-tighter group-hover:opacity-100 italic">
                      {sec.id.replace('-', ' ')}
                    </div>
                    <div className="text-[11px] font-bold uppercase leading-tight tracking-tight">
                      {sec.title}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <h3 className="text-[10px] font-mono uppercase opacity-50 mb-2 font-bold tracking-widest text-center border-b border-[#141414]/10 pb-2">Passives & Power</h3>
                <ComponentTool icon={<Zap size={16} />} name="Battery" description="9V Source" />
                <ComponentTool icon={<Activity size={16} />} name="Resistor" description="100Ω Limit" />
                
                <h3 className="text-[10px] font-mono uppercase opacity-50 mb-2 font-bold tracking-widest text-center border-b border-[#141414]/10 pb-2 pt-4">Semiconductors</h3>
                <ComponentTool icon={<Lightbulb size={16} />} name="LED" description="PN Light Gen" />
                <ComponentTool icon={<Microchip size={16} />} name="Transistor" description="NPN Amplifier" />
                
                <h3 className="text-[10px] font-mono uppercase opacity-50 mb-2 font-bold tracking-widest text-center border-b border-[#141414]/10 pb-2 pt-4">Digital</h3>
                <ComponentTool icon={<Brain size={16} />} name="NAND Gate" description="Universal" />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#141414] bg-[#d4d3d0]">
            {activeTab === 'lab' ? (
              <button 
                onClick={() => setSimulatorRunning(!simulatorRunning)}
                className={`w-full py-4 flex items-center justify-center gap-3 border-2 border-[#141414] font-mono text-xs font-bold uppercase transition-all shadow-[4px_4px_0px_#141414] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                  simulatorRunning 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-[#141414] text-white hover:bg-[#333]'
                }`}
              >
                {simulatorRunning ? <><Square size={14} fill="white" /> Stop Lab</> : <><Play size={14} fill="white" /> Power Up Lab</>}
              </button>
            ) : (
              <div className="text-[9px] font-mono uppercase opacity-40 text-center leading-relaxed italic">
                Study deep, test often.<br/>Electronics mastery awaits.
              </div>
            )}
          </div>
        </aside>

        {/* Workspace */}
        <div className="flex-1 relative bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (activeTab === 'theory' ? selectedSection.id : activeQuizSection.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {activeTab === 'lab' && <CircuitCanvas isRunning={simulatorRunning} recipe={labRecipe} />}
              {activeTab === 'theory' && <TheoryPortal section={selectedSection} onAction={loadRecipe} />}
              {activeTab === 'quiz' && <QuizCenter section={activeQuizSection} />}
              {activeTab === 'formulas' && <FormulaSheet />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Inspector / Tutor */}
        <aside className="w-88 border-l border-[#141414] flex flex-col bg-[#E4E3E0]">
          <div className="p-4 border-b border-[#141414] bg-[#d4d3d0]">
            <h2 className="text-[11px] font-mono uppercase font-bold tracking-wider italic flex items-center justify-between">
              Exam Assistant // Volt AI
              <HelpCircle size={14} />
            </h2>
          </div>
          <TutorAssistant />
        </aside>
      </main>

      {/* Footer / Status */}
      <footer className="border-t border-[#141414] p-2.5 px-4 flex justify-between items-center text-[10px] font-mono bg-[#E4E3E0] z-50">
        <div className="flex gap-8 uppercase font-bold">
          <span className="flex items-center gap-2"><Zap size={12} fill="#F27D26" stroke="#F27D26" /> DC Bus: 9.00V</span>
          <span className="flex items-center gap-2"><Activity size={12} className="text-blue-600" /> Load: 45.2mA</span>
          <span className="flex items-center gap-2 opacity-60"><Waves size={12} /> Frequency: 50.0Hz</span>
        </div>
        <div className="uppercase flex items-center gap-4">
          <span className="opacity-50">Environment: Stable</span>
          <span className="bg-[#141414] text-white px-2 py-0.5 rounded-sm">MEM: 1024MB</span>
        </div>
      </footer>
    </div>
  );
}

function ComponentTool({ icon, name, description }: { icon: React.ReactNode, name: string, description: string }) {
  return (
    <button className="w-full group p-3 bg-white border border-[#141414] flex items-center gap-3 transition-all hover:bg-[#141414] hover:text-white text-left shadow-[3px_3px_0px_#141414] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
      <div className="p-2.5 border border-[#141414] group-hover:border-white bg-[#f8f8f8] group-hover:bg-[#141414]">
        {icon}
      </div>
      <div>
        <div className="text-[12px] font-black font-mono uppercase leading-tight tracking-tighter">{name}</div>
        <div className="text-[9px] opacity-60 uppercase leading-tight tracking-normal">{description}</div>
      </div>
    </button>
  );
}

function TheoryPortal({ section, onAction }: { section: Section, onAction?: (id: string) => void }) {
  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-12 h-full border-r border-[#141414]/10 bg-[#fbfbfb] flex flex-col items-center py-8">
        <div className="writing-vertical-rl rotate-180 text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 whitespace-nowrap">
          ELECTRONICS THEORY // UNIT 10
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-12 pl-24 space-y-10 custom-scrollbar">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-2 py-0.5 bg-[#141414] text-white text-[10px] font-mono uppercase tracking-widest">Core Concept</span>
             <div className="h-[1px] flex-1 bg-[#141414]/10"></div>
          </div>
          <h2 className="text-6xl font-mono font-black tracking-[calc(-0.06em)] uppercase leading-[0.85] text-[#141414]">
            {section.title.split(' ').slice(1).join(' ')}
          </h2>
          <p className="text-xl font-mono font-medium opacity-60 uppercase tracking-tighter flex items-center gap-4">
            <span className="text-[#F27D26] font-black">[{section.id}]</span>
            {section.summary}
          </p>
        </header>

        <div className="grid grid-cols-12 gap-8 pt-8">
          <div className="col-span-7 space-y-8">
            <div className="p-8 border-2 border-[#141414] bg-white relative group">
              <div className="absolute -top-3 -left-3 px-3 py-1 bg-white border-2 border-[#141414] text-[10px] font-mono font-bold uppercase shadow-[2px_2px_0px_#141414]">Overview</div>
              <ul className="space-y-6">
                {section.theory.map((point, i) => (
                  <li key={i} className="flex gap-6 items-start group/li">
                    <span className="text-3xl font-mono font-black text-[#141414]/10 group-hover/li:text-[#F27D26] transition-colors leading-none">0{i+1}</span>
                    <p className="text-lg leading-snug font-serif text-[#141414] font-medium pt-1">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-5 space-y-6">
            <div className="p-8 bg-[#141414] text-white space-y-4 shadow-[8px_8px_0px_rgba(242,125,38,0.3)]">
              <div className="flex items-center gap-2 text-[#F27D26]">
                <Info size={16} />
                <span className="text-[11px] font-mono uppercase font-black tracking-widest">Professor's Annotations</span>
              </div>
              <p className="text-sm font-mono leading-relaxed opacity-80 uppercase italic">
                "Pay special attention to the mechanical analogies. In the exam, thinking of current as water flow helps prevent sign errors in KVL!"
              </p>
            </div>
            
            <div className="aspect-square border border-[#141414]/20 bg-[#f5f5f5] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(#141414_1px,transparent_1px)] [background-size:10px_10px] opacity-5"></div>
               <div className="text-center p-8">
                  <div className="w-16 h-16 border-2 border-[#141414] rounded-full mx-auto flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                     <Play size={24} />
                  </div>
                  <button 
                    onClick={() => onAction && onAction(section.id)}
                    className="px-4 py-2 bg-[#F27D26] text-white font-mono text-[10px] font-black uppercase shadow-[4px_4px_0px_#141414] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    Launch Lab Experiment
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizCenter({ section }: { section: Section }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = section.quiz[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowResult(true);
    if (idx === question.correctIndex) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < section.quiz.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setShowResult(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-12 bg-white relative">
      <div className="max-w-3xl w-full space-y-12">
        <div className="text-center space-y-4">
           <span className="text-[11px] font-mono uppercase tracking-[0.5em] font-black opacity-40">Knowledge Validation Mode</span>
           <h2 className="text-4xl font-mono font-black uppercase tracking-tight leading-none italic">{section.title}</h2>
        </div>

        <div className="relative group p-8 bg-[#d4d3d0] border border-[#141414] shadow-[12px_12px_0px_#141414] transition-all">
          <div className="absolute -top-4 -left-4 px-4 py-1.5 bg-[#141414] text-white text-[11px] font-mono font-bold uppercase shadow-[4px_4px_0px_rgba(20,20,20,0.3)]">
            Question 0{currentIdx + 1} / 0{section.quiz.length}
          </div>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-mono font-bold uppercase leading-tight tracking-tighter pt-4">
              {question.question}
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((opt, i) => {
                let bgColor = "bg-white";
                let borderColor = "border-[#141414]";
                let textColor = "text-[#141414]";

                if (showResult) {
                  if (i === question.correctIndex) {
                    bgColor = "bg-green-600";
                    borderColor = "border-green-700";
                    textColor = "text-white";
                  } else if (i === selectedOpt) {
                    bgColor = "bg-red-500";
                    borderColor = "border-red-700";
                    textColor = "text-white";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    disabled={showResult}
                    className={`w-full p-5 border shadow-[4px_4px_0px_rgba(20,20,20,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-6 text-sm font-mono font-bold uppercase text-left group ${bgColor} ${borderColor} ${textColor}`}
                  >
                    <span className={`w-8 h-8 flex items-center justify-center border font-black transition-colors ${showResult ? 'border-white/30' : 'border-[#141414]'}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 p-6 bg-white border border-[#141414] border-l-8 border-l-[#141414] space-y-3"
              >
                <div className="flex items-center gap-2">
                  {selectedOpt === question.correctIndex ? <CheckCircle2 size={16} className="text-green-600" /> : <AlertCircle size={16} className="text-red-500" />}
                  <span className="text-[11px] font-mono font-black uppercase tracking-widest">
                    {selectedOpt === question.correctIndex ? 'Correct Submission' : 'Analysis Required'}
                  </span>
                </div>
                <p className="text-sm font-serif italic text-[#141414]/80 leading-relaxed pt-1">
                  {question.explanation}
                </p>
                {currentIdx < section.quiz.length - 1 && (
                  <button 
                    onClick={nextQuestion}
                    className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase font-black tracking-widest underline underline-offset-4 hover:text-[#F27D26] transition-colors"
                  >
                    Proceed to next phase <ChevronRight size={14} />
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TutorAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Systems online. I am Volt, your electronics exam specialist. Ask me anything about Unit 10: Electronics." }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim() || loading) return;
    
    const userMsg = prompt;
    setPrompt("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are an expert electronics professor named Volt, specializing in the Tanzanian syllabus (PJ Gibson references). 
            User is studying for an electronics exam.
            Syllabus Content: ${JSON.stringify(SYLLABUS)}
            Rules:
            1. Keep answers technical yet clear.
            2. Use analogies (e.g., water for electricity).
            3. Reference specific exam questions if relevant (e.g., "In the 2013 paper, they asked...").
            4. If asked about syllabus topics like "Band Theory" or "Op-Amps", give detailed explanations.
            5. Encourage the user frequently.
            User: ${userMsg}`,
          });
          setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm not sure how to answer that." }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'bot', text: "Sorry, communication breakdown. Check your carrier wave." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-4 overflow-hidden relative">
      <div className="flex-1 overflow-y-auto space-y-6 text-sm custom-scrollbar pr-2 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`text-[9px] font-mono uppercase opacity-30 mb-1 tracking-widest`}>
              {m.role === 'user' ? 'Student' : 'Volt'}
            </div>
            <div className={`max-w-[100%] p-4 border border-[#141414] font-mono text-[11px] leading-relaxed shadow-[4px_4px_0px_rgba(20,20,20,0.05)] ${
              m.role === 'user' ? 'bg-[#141414] text-white' : 'bg-white text-[#141414]'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-[#F27D26] animate-ping"></div>
             <span className="text-[10px] font-mono font-black animate-pulse uppercase tracking-[0.2em] opacity-40">Calculating...</span>
          </div>
        )}
      </div>
      <div className="border border-[#141414] p-4 bg-white shadow-[6px_6px_0px_rgba(20,20,20,0.1)]">
        <textarea 
          placeholder="TRANSMIT YOUR QUESTION..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
          className="w-full p-0 bg-transparent focus:outline-none font-mono text-[11px] uppercase resize-none h-24 placeholder:text-[#141414]/20 font-bold"
        />
        <div className="flex justify-between items-center mt-2 border-t border-[#141414]/10 pt-2">
           <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest font-black">Ready for input</span>
           <button 
             onClick={sendMessage}
             disabled={loading}
             className="px-6 py-2 bg-[#141414] text-white font-mono text-[10px] font-black uppercase hover:bg-[#F27D26] transition-colors shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"
           >
             Send
           </button>
        </div>
      </div>
    </div>
  );
}
