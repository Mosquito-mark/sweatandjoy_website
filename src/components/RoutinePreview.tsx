import React, { useState } from 'react';
import { SAMPLE_ROUTINE } from '../data/coachingData';
import { retroAudio } from '../utils/audio';

export const RoutinePreview: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});

  const activeDay = SAMPLE_ROUTINE.days[activeDayIndex] || SAMPLE_ROUTINE.days[0];

  const toggleCheck = (id: string) => {
    retroAudio.playClick();
    setCheckedExercises((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="pixel-border bg-white p-3 sm:p-4 font-courier space-y-4">
      {/* Header */}
      <div className="window-header px-2 py-1 flex justify-between items-center text-xs sm:text-sm select-none">
        <span className="font-bold flex items-center gap-1.5 font-vt323 tracking-wide">
          <span>📋</span> SAMPLE PROGRAM VIEWER // 4-WEEK NASM BLOCK
        </span>
        <span className="text-[10px] bg-yellow-300 text-black px-1.5 py-0.5 font-bold border border-black">
          PHASE 1 STABILIZATION
        </span>
      </div>

      {/* Routine Metadata */}
      <div className="bg-gray-100 p-2.5 border border-black space-y-1 text-xs">
        <div className="flex justify-between flex-wrap gap-1">
          <span className="font-bold text-blue-900 uppercase">{SAMPLE_ROUTINE.phase}</span>
          <span className="text-gray-600">Delivered via Companion App</span>
        </div>
        <p className="text-gray-700">
          <strong>Focus:</strong> {SAMPLE_ROUTINE.focus}
        </p>
        <div className="p-1.5 bg-yellow-50 border border-gray-400 text-[11px] text-gray-800">
          💡 <strong>Wally's Tempo Rule:</strong> {SAMPLE_ROUTINE.tempoExplanation}
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SAMPLE_ROUTINE.days.map((day, idx) => {
          const isActive = idx === activeDayIndex;
          return (
            <button
              key={idx}
              onClick={() => {
                retroAudio.playClick();
                setActiveDayIndex(idx);
              }}
              className={`p-2 text-left border-2 border-black cursor-pointer text-xs ${
                isActive
                  ? 'bg-blue-800 text-yellow-300 shadow-[2px_2px_0px_#000]'
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
            >
              <span className="font-bold block truncate">{day.day.split(':')[0]}</span>
              <span className="text-[10px] opacity-80 block truncate">
                {day.day.split(':')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail */}
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-50 p-2 pixel-border-inset text-xs">
          <div>
            <h3 className="font-bold text-black">{activeDay.day}</h3>
            <span className="text-[11px] text-gray-600">Target: {activeDay.target}</span>
          </div>
          <span className="text-[11px] font-bold bg-gray-200 px-2 py-0.5 border border-black">
            ⏱️ {activeDay.duration}
          </span>
        </div>

        {/* Exercise List */}
        <div className="space-y-2">
          {activeDay.exercises.map((ex, idx) => {
            const exKey = `${activeDayIndex}-${idx}`;
            const isCompleted = !!checkedExercises[exKey];

            return (
              <div
                key={idx}
                className={`p-2.5 border border-black transition-colors ${
                  isCompleted ? 'bg-green-50 opacity-75' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCheck(exKey)}
                      className="mt-0.5 text-xs font-bold font-mono px-1 border border-black bg-gray-100 hover:bg-gray-200"
                    >
                      {isCompleted ? '[X]' : '[ ]'}
                    </button>
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isCompleted ? 'line-through text-gray-500' : 'text-black'
                        }`}
                      >
                        {ex.name}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-600 mt-1">
                        <span>
                          <strong>Volume:</strong> {ex.sets}
                        </span>
                        <span>
                          <strong>Reps:</strong> {ex.reps}
                        </span>
                        <span>
                          <strong>Tempo:</strong> {ex.tempo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[11px] bg-yellow-50/80 p-1.5 border-l-2 border-l-black text-gray-800">
                  <strong className="text-black">Wally's Cue:</strong> {ex.cues}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
