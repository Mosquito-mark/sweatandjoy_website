import React, { useState } from 'react';
import { MOVEMENT_TESTS } from '../data/coachingData';
import { retroAudio } from '../utils/audio';

export const NasmLab: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({
    squat: 0,
    posture: 1
  });
  const [activeTestId, setActiveTestId] = useState<string>('squat');

  const currentTest = MOVEMENT_TESTS.find((t) => t.id === activeTestId) || MOVEMENT_TESTS[0];
  const selectedOptionIndex = selectedAnswers[currentTest.id] ?? 0;
  const activeVerdict = currentTest.options[selectedOptionIndex];

  const handleSelectOption = (index: number) => {
    retroAudio.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTest.id]: index
    }));
  };

  return (
    <section className="pixel-border bg-white p-3 sm:p-4 font-courier space-y-4">
      {/* Window Header */}
      <div className="window-header px-2 py-1 flex justify-between items-center text-xs sm:text-sm select-none">
        <span className="font-bold flex items-center gap-1.5 font-vt323 tracking-wide">
          <span>🔬</span> NASM MOVEMENT SCREEN // KINETIC CHAIN LAB
        </span>
        <span className="text-[10px] bg-green-400 text-black px-1.5 py-0.5 font-bold border border-black">
          INTERACTIVE TOOL
        </span>
      </div>

      <div className="bg-yellow-50 p-2.5 pixel-border-inset text-xs space-y-1">
        <div className="font-bold text-blue-900 uppercase flex items-center gap-1">
          <span>📐</span>
          <span>Wally's Kinetic Chain Assessment Protocol</span>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Before Wally ever prescribes heavy deadlifts or barbell presses, we evaluate how your joints interact. Pick a test below, follow the instructions, and pick the compensation you experience to get Wally's immediate corrective blueprint!
        </p>
      </div>

      {/* Test Tabs */}
      <div className="flex gap-2 border-b-2 border-black pb-2 overflow-x-auto">
        {MOVEMENT_TESTS.map((test) => {
          const isActive = test.id === activeTestId;
          return (
            <button
              key={test.id}
              onClick={() => {
                retroAudio.playClick();
                setActiveTestId(test.id);
              }}
              className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer border-2 border-black ${
                isActive
                  ? 'bg-blue-800 text-yellow-300 shadow-[2px_2px_0px_#000]'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {test.title}
            </button>
          );
        })}
      </div>

      {/* Active Test Body */}
      <div className="space-y-3">
        <div className="bg-gray-100 p-2 border border-black">
          <span className="text-[10px] uppercase font-bold text-gray-600 block">
            Target Focus: {currentTest.area}
          </span>
          <h3 className="font-bold text-sm text-black">{currentTest.title}</h3>
          <p className="text-xs text-gray-800 mt-1">{currentTest.description}</p>
        </div>

        {/* Options Selection */}
        <div>
          <label className="block text-xs font-bold mb-2 uppercase text-black">
            👉 {currentTest.instruction}
          </label>
          <div className="space-y-2">
            {currentTest.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-2.5 text-xs border-2 border-black cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-900 shadow-[3px_3px_0px_#000080]'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-blue-900">
                      {isSelected ? '[X]' : '[ ]'}
                    </span>
                    <div>
                      <span className="font-bold text-black block">{opt.label}</span>
                      <span className="text-[11px] text-gray-600 mt-0.5 block">
                        {opt.description}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wally's Prescription Output */}
        {activeVerdict && (
          <div className="pixel-border bg-[#fffff0] p-3 space-y-2 mt-4">
            <div className="flex justify-between items-start border-b border-gray-400 pb-1.5">
              <div>
                <span className="text-[10px] font-bold text-gray-600 uppercase block">
                  CLINICAL VERDICT:
                </span>
                <span className="font-black text-sm text-blue-950 uppercase">
                  {activeVerdict.verdict}
                </span>
              </div>
              <span className="bg-green-700 text-white text-[10px] px-1.5 py-0.5 font-bold uppercase">
                NASM CORRECTIVE
              </span>
            </div>

            <div className="bg-white p-2.5 pixel-border-inset text-xs italic text-gray-800 border-l-4 border-l-blue-800">
              {activeVerdict.wallyAdvice}
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-black block mb-1">
                Wally's Recommended Corrective Protocol:
              </span>
              <ul className="space-y-1 text-xs">
                {activeVerdict.correctiveDrills.map((drill, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 bg-gray-50 p-1.5 border border-gray-300">
                    <span className="text-green-700 font-bold">▶</span>
                    <span className="text-gray-900">{drill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
