import React, { useState } from 'react';
import { FAQS } from '../data/coachingData';
import { retroAudio } from '../utils/audio';

export const FaqManifesto: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    retroAudio.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="pixel-border bg-white p-3 sm:p-4 font-courier space-y-4">
      {/* Header */}
      <div className="window-header px-2 py-1 flex justify-between items-center text-xs sm:text-sm select-none">
        <span className="font-bold flex items-center gap-1.5 font-vt323 tracking-wide">
          <span>❓</span> WALLY'S MANIFESTO // ZERO-SLOP FAQ
        </span>
        <span className="text-[10px] bg-yellow-300 text-black px-1.5 py-0.5 font-bold border border-black">
          NO-BS POLICY
        </span>
      </div>

      {/* The Zero-AI Manifesto Box */}
      <div className="pixel-border-inset p-3 bg-yellow-50 text-xs space-y-2">
        <div className="flex items-center gap-2 border-b border-black pb-1.5">
          <span className="text-xl">📜</span>
          <div>
            <h3 className="font-black uppercase text-sm text-black">
              THE SWEAT & JOY HUMAN MANIFESTO
            </h3>
            <span className="text-[10px] text-gray-700">Authored by Coach Wally // Typed on an IBM Model M</span>
          </div>
        </div>

        <p className="text-gray-800 leading-relaxed">
          "I aced gym and flunked computers. In an internet currently flooded with synthesized fitness bots generating hallucinated exercises that hurt real human joints, I stand on solid ground:
        </p>

        <ul className="space-y-1 list-disc list-inside text-gray-900 font-bold">
          <li>Every routine is written by human hands for your specific anatomy.</li>
          <li>Every form video you submit is scrutinized by two real human eyes.</li>
          <li>No automated algorithms, no auto-renew hostage pricing, zero AI slop.</li>
          <li>Certified by the National Academy of Sports Medicine (NASM).</li>
        </ul>
      </div>

      {/* Accordion FAQs */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase text-black bg-gray-100 p-1.5 border border-black">
          FREQUENTLY ASKED QUESTIONS:
        </h3>

        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border border-black bg-white">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-2.5 font-bold text-xs flex justify-between items-center gap-2 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-blue-900">{faq.q}</span>
                <span className="font-mono text-xs">{isOpen ? '[-] collapse' : '[+] expand'}</span>
              </button>
              {isOpen && (
                <div className="p-2.5 border-t border-gray-300 bg-gray-50 text-xs text-gray-800 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
