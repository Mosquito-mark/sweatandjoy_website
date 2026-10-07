/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RetroMarquee } from './components/RetroMarquee';
import { Wizard } from './components/Wizard';
import { NasmLab } from './components/NasmLab';
import { RoutinePreview } from './components/RoutinePreview';
import { Guestbook } from './components/Guestbook';
import { FaqManifesto } from './components/FaqManifesto';
import { ReceiptModal } from './components/ReceiptModal';
import { RetroDialog } from './components/RetroDialog';
import { SPECIALTIES, WALLY_ESSENTIALS, PLANS } from './data/coachingData';
import { IntakeData } from './types';
import { retroAudio } from './utils/audio';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'wizard' | 'lab' | 'routine' | 'guestbook' | 'faq'>('wizard');
  const [urlAddress, setUrlAddress] = useState<string>('http://geocities.com/sweat_and_joy_fitness/');

  // Audio & Display settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Active dropdown menu
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Modals & Dialogs
  const [receiptOpen, setReceiptOpen] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<'close_confirm' | 'about_wally' | 'copy_alert' | null>(null);

  // Visitor Counter
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('sj_visitor_counter');
      if (stored) return parseInt(stored, 10);
    } catch {
      // safe fallback
    }
    return 7349;
  });

  // Selected essential card detail
  const [selectedEssential, setSelectedEssential] = useState<number | null>(null);

  // Shared Intake State
  const [intakeData, setIntakeData] = useState<IntakeData>({
    planId: 'basic',
    env: 'Full Gym Access',
    goal: 'Beginner Foundation',
    daysPerWeek: 3,
    aches: [],
    clientName: '',
    clientEmail: '',
    notes: ''
  });

  // Update address bar according to tab
  const handleTabChange = (tab: 'wizard' | 'lab' | 'routine' | 'guestbook' | 'faq') => {
    retroAudio.playNav();
    setActiveTab(tab);
    setOpenMenu(null);
    if (tab === 'wizard') setUrlAddress('http://geocities.com/sweat_and_joy_fitness/');
    else if (tab === 'lab') setUrlAddress('http://geocities.com/sweat_and_joy_fitness/nasm-lab.htm');
    else if (tab === 'routine') setUrlAddress('http://geocities.com/sweat_and_joy_fitness/custom-routine.htm');
    else if (tab === 'guestbook') setUrlAddress('http://geocities.com/sweat_and_joy_fitness/guestbook.htm');
    else if (tab === 'faq') setUrlAddress('http://geocities.com/sweat_and_joy_fitness/manifesto-faq.htm');
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    retroAudio.enabled = next;
    if (next) retroAudio.playChime();
  };

  const incrementVisitor = () => {
    retroAudio.playClick();
    const next = visitorCount + 1;
    setVisitorCount(next);
    try {
      localStorage.setItem('sj_visitor_counter', next.toString());
    } catch {
      // safe fallback
    }
  };

  const handleCopyEmail = () => {
    retroAudio.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('wally@sweatandjoyfitness.example.com');
    }
    setDialogState('copy_alert');
  };

  // Close menus on outside click
  useEffect(() => {
    const closeMenus = () => setOpenMenu(null);
    window.addEventListener('click', closeMenus);
    return () => window.removeEventListener('click', closeMenus);
  }, []);

  const selectedPlanObj = PLANS.find((p) => p.id === intakeData.planId) || PLANS[1];

  return (
    <div className={`min-h-screen text-black flex flex-col justify-between selection:bg-yellow-300 ${crtEnabled ? 'crt-overlay' : ''}`}>
      {/* Top Container */}
      <div className={`mx-auto w-full transition-all ${isMaximized ? 'max-w-6xl p-2 sm:p-4' : 'max-w-2xl p-2 sm:p-6'}`}>
        
        {/* Main IE Window */}
        {!isMinimized ? (
          <header className="pixel-border bg-white mb-4">
            {/* IE Title Bar */}
            <div className="window-header px-2 py-1 flex justify-between items-center text-base sm:text-lg select-none">
              <span className="font-bold flex items-center gap-1.5 truncate">
                <span className="text-yellow-300">🌐</span>
                <span>IE v5.5 - sweat_and_joy_fitness.html</span>
              </span>
              <div className="flex space-x-1 shrink-0">
                <button
                  type="button"
                  title="Minimize to taskbar"
                  onClick={(e) => {
                    e.stopPropagation();
                    retroAudio.playClick();
                    setIsMinimized(true);
                  }}
                  className="px-1.5 bg-gray-300 text-black border border-black text-xs font-bold hover:bg-gray-400 active:translate-y-0.5 cursor-pointer"
                >
                  _
                </button>
                <button
                  type="button"
                  title="Toggle Maximize"
                  onClick={(e) => {
                    e.stopPropagation();
                    retroAudio.playClick();
                    setIsMaximized(!isMaximized);
                  }}
                  className="px-1.5 bg-gray-300 text-black border border-black text-xs font-bold hover:bg-gray-400 active:translate-y-0.5 cursor-pointer"
                >
                  □
                </button>
                <button
                  type="button"
                  title="Close Window"
                  onClick={(e) => {
                    e.stopPropagation();
                    retroAudio.playAlert();
                    setDialogState('close_confirm');
                  }}
                  className="px-1.5 bg-red-600 text-white border border-black text-xs font-bold hover:bg-red-700 active:translate-y-0.5 cursor-pointer"
                >
                  X
                </button>
              </div>
            </div>

            {/* Menu Bar with Working Dropdowns */}
            <div className="bg-gray-200 border-b border-black px-2 py-1 text-xs flex items-center space-x-3 select-none relative z-20">
              {/* File Menu */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <span
                  onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
                  className={`font-bold cursor-pointer hover:bg-blue-800 hover:text-white px-1 ${
                    openMenu === 'file' ? 'bg-blue-800 text-white' : ''
                  }`}
                >
                  <u>F</u>ile
                </span>
                {openMenu === 'file' && (
                  <div className="absolute left-0 top-full mt-1 w-52 win98-box p-1 text-xs space-y-0.5 z-30 shadow-lg">
                    <button
                      onClick={() => {
                        handleTabChange('wizard');
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      New Intake Simulation
                    </button>
                    <button
                      onClick={() => {
                        retroAudio.playClick();
                        setReceiptOpen(true);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      Print Intake Slip / Receipt
                    </button>
                    <div className="border-t border-gray-400 my-1" />
                    <button
                      onClick={() => {
                        retroAudio.playAlert();
                        setDialogState('close_confirm');
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      Exit Window
                    </button>
                  </div>
                )}
              </div>

              {/* Edit Menu */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <span
                  onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
                  className={`font-bold cursor-pointer hover:bg-blue-800 hover:text-white px-1 ${
                    openMenu === 'edit' ? 'bg-blue-800 text-white' : ''
                  }`}
                >
                  <u>E</u>dit
                </span>
                {openMenu === 'edit' && (
                  <div className="absolute left-0 top-full mt-1 w-56 win98-box p-1 text-xs space-y-0.5 z-30 shadow-lg">
                    <button
                      onClick={() => {
                        handleCopyEmail();
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      Copy Wally's Direct Email
                    </button>
                    <button
                      onClick={() => {
                        retroAudio.playClick();
                        setIntakeData((prev) => ({
                          ...prev,
                          clientName: '',
                          clientEmail: '',
                          notes: ''
                        }));
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      Clear Name & Email Fields
                    </button>
                  </div>
                )}
              </div>

              {/* View Menu */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <span
                  onClick={() => setOpenMenu(openMenu === 'view' ? null : 'view')}
                  className={`font-bold cursor-pointer hover:bg-blue-800 hover:text-white px-1 ${
                    openMenu === 'view' ? 'bg-blue-800 text-white' : ''
                  }`}
                >
                  <u>V</u>iew
                </span>
                {openMenu === 'view' && (
                  <div className="absolute left-0 top-full mt-1 w-60 win98-box p-1 text-xs space-y-0.5 z-30 shadow-lg">
                    <button
                      onClick={() => {
                        retroAudio.playClick();
                        setCrtEnabled(!crtEnabled);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer flex justify-between"
                    >
                      <span>CRT Scanlines Filter</span>
                      <span>{crtEnabled ? '[ON]' : '[OFF]'}</span>
                    </button>
                    <button
                      onClick={() => {
                        toggleSound();
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer flex justify-between"
                    >
                      <span>Retro Sound FX (Web Audio)</span>
                      <span>{soundEnabled ? '[ON]' : '[OFF]'}</span>
                    </button>
                    <button
                      onClick={() => {
                        incrementVisitor();
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      Increment Visitor Counter (+1)
                    </button>
                  </div>
                )}
              </div>

              {/* Help Menu */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <span
                  onClick={() => setOpenMenu(openMenu === 'help' ? null : 'help')}
                  className={`font-bold cursor-pointer hover:bg-blue-800 hover:text-white px-1 ${
                    openMenu === 'help' ? 'bg-blue-800 text-white' : ''
                  }`}
                >
                  <u>H</u>elp
                </span>
                {openMenu === 'help' && (
                  <div className="absolute left-0 top-full mt-1 w-52 win98-box p-1 text-xs space-y-0.5 z-30 shadow-lg">
                    <button
                      onClick={() => {
                        retroAudio.playClick();
                        setDialogState('about_wally');
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      About Wally & S&J
                    </button>
                    <button
                      onClick={() => {
                        handleTabChange('faq');
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-blue-800 hover:text-white block cursor-pointer"
                    >
                      Why Zero AI? Manifesto
                    </button>
                  </div>
                )}
              </div>

              {/* Sound & Scanline Quick Controls */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`px-1.5 py-0.5 border text-[11px] font-bold cursor-pointer flex items-center gap-1 ${
                    soundEnabled
                      ? 'bg-green-300 text-black border-black'
                      : 'bg-gray-300 text-gray-700 border-gray-500'
                  }`}
                  title="Toggle 8-bit sound effects"
                >
                  <span>{soundEnabled ? '🔊' : '🔇'}</span>
                  <span className="hidden sm:inline">SOUND: {soundEnabled ? 'ON' : 'OFF'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    retroAudio.playClick();
                    setCrtEnabled(!crtEnabled);
                  }}
                  className={`px-1.5 py-0.5 border text-[11px] font-bold cursor-pointer flex items-center gap-1 ${
                    crtEnabled
                      ? 'bg-purple-300 text-black border-black'
                      : 'bg-gray-300 text-gray-700 border-gray-500'
                  }`}
                  title="Toggle CRT Scanlines"
                >
                  <span>📺</span>
                  <span className="hidden sm:inline">CRT: {crtEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Address Toolbar */}
            <div className="bg-gray-100 border-b-2 border-black p-1.5 text-xs flex items-center gap-1.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => handleTabChange('wizard')}
                className="win98-btn px-2 py-0.5 font-bold text-xs"
                title="Back / Home"
              >
                🏠 Home
              </button>
              <button
                type="button"
                onClick={() => {
                  retroAudio.playClick();
                  incrementVisitor();
                }}
                className="win98-btn px-2 py-0.5 font-bold text-xs"
                title="Refresh Page"
              >
                🔄 Refresh
              </button>
              <span className="text-gray-600 font-bold ml-1">Address:</span>
              <div className="bg-white px-2 py-0.5 border border-gray-600 text-black truncate flex-1 font-mono text-[11px] select-all shadow-inner">
                {urlAddress}
              </div>
            </div>

            {/* Retro Navigation Tabs Bar */}
            <div className="bg-[#000080] p-1 flex gap-1 overflow-x-auto text-xs font-courier select-none">
              {[
                { id: 'wizard', label: '📁 INTAKE WIZARD', icon: '📝' },
                { id: 'lab', label: '🔬 NASM MOVEMENT LAB', icon: '📐' },
                { id: 'routine', label: '📋 SAMPLE ROUTINE', icon: '🏋️' },
                { id: 'guestbook', label: '📖 GUESTBOOK', icon: '✍️' },
                { id: 'faq', label: '📜 MANIFESTO & FAQ', icon: '❓' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id as typeof activeTab)}
                    className={`px-2.5 py-1 text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                      isActive
                        ? 'bg-yellow-300 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                        : 'bg-gray-300 text-black hover:bg-gray-200 border border-black'
                    }`}
                  >
                    <span>{tab.icon} </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Marquee Banner */}
            <RetroMarquee />
          </header>
        ) : (
          /* Minimized State */
          <div className="pixel-border bg-white p-3 mb-4 flex justify-between items-center">
            <span className="font-bold text-xs font-vt323 text-lg flex items-center gap-2">
              <span>🌐</span> SWEAT & JOY FITNESS (MINIMIZED IN SYSTEM TRAY)
            </span>
            <button
              onClick={() => {
                retroAudio.playClick();
                setIsMinimized(false);
              }}
              className="pixel-btn px-3 py-1 text-xs font-bold uppercase bg-yellow-300"
            >
              RESTORE WINDOW [⬚]
            </button>
          </div>
        )}

        {/* Main Body */}
        {!isMinimized && (
          <main className="space-y-4">
            
            {/* Coach Wally Hero Banner */}
            <section className="pixel-border bg-white p-4 font-courier">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Vintage Portrait */}
                <div className="relative shrink-0">
                  <div className="w-32 h-40 bg-zinc-900 pixel-border flex flex-col items-center justify-center p-2 relative overflow-hidden bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:4px_4px]">
                    {/* Retro Coach SVG Avatar */}
                    <svg
                      viewBox="0 0 100 120"
                      className="w-full h-full filter contrast-125"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Coach Wally Pixel/Vector Rendering */}
                      <rect x="25" y="30" width="50" height="55" rx="10" fill="#f4caa1" stroke="#000" strokeWidth="3" />
                      {/* Hair / Head */}
                      <rect x="23" y="24" width="54" height="15" fill="#4a2e1b" stroke="#000" strokeWidth="3" />
                      {/* Retro 80s/90s Red Sweatband */}
                      <rect x="20" y="35" width="60" height="10" fill="#dc2626" stroke="#000" strokeWidth="2.5" />
                      <line x1="20" y1="40" x2="80" y2="40" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" />
                      {/* Eyes with retro determination */}
                      <rect x="36" y="52" width="6" height="6" fill="#000" />
                      <rect x="58" y="52" width="6" height="6" fill="#000" />
                      {/* Grin */}
                      <path d="M40 70 Q50 78 60 70" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="square" />
                      {/* Whistle lanyard */}
                      <line x1="42" y1="85" x2="50" y2="100" stroke="#000" strokeWidth="2" />
                      <line x1="58" y1="85" x2="50" y2="100" stroke="#000" strokeWidth="2" />
                      <rect x="47" y="100" width="8" height="12" fill="#eab308" stroke="#000" strokeWidth="2" />
                      {/* Blue athletic tank top */}
                      <path d="M15 88 L30 85 L70 85 L85 88 L85 120 L15 120 Z" fill="#1d4ed8" stroke="#000" strokeWidth="3" />
                    </svg>
                    <div className="absolute top-1 left-1 bg-black text-[#00ff00] text-[8px] font-mono px-1">
                      WALLY_CAM
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-green-600 text-white text-[10px] px-1 font-bold border border-black shadow">
                    HUMAN*
                  </span>
                </div>

                {/* Coach Bio */}
                <div className="flex-1 w-full text-center sm:text-left space-y-1.5">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase bg-black text-white px-2 py-0.5 inline-block">
                      SWEAT & JOY FITNESS
                    </h1>
                    <p className="text-xs text-gray-700 italic mt-0.5">
                      "Your life. Your goals. Your schedule."
                    </p>
                  </div>

                  <div className="bg-gray-100 p-2.5 pixel-border-inset text-xs space-y-1 text-left">
                    <p>
                      <strong>Coach:</strong> Wally (Aced gym, flunked computers)
                    </p>
                    <p>
                      <strong>Core Method:</strong> NASM corrective exercise & personalized virtual coaching.
                    </p>
                    <p>
                      <strong>AI Policy:</strong> 100% Organic Human Intelligence. Zero Slop.
                    </p>
                    <p className="text-blue-900 font-bold">
                      <strong>Direct Desk Line:</strong> wally@sweatandjoyfitness.example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Wally's Top 4 Essentials */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-400">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold uppercase">Wally's Top 4 Essentials:</p>
                  <span className="text-[10px] text-gray-500 italic">Click card for coaching details</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {WALLY_ESSENTIALS.map((ess, idx) => {
                    const isSelected = selectedEssential === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          retroAudio.playClick();
                          setSelectedEssential(isSelected ? null : idx);
                        }}
                        className={`pixel-border-inset p-2 cursor-pointer transition-all ${
                          isSelected ? 'bg-yellow-100 border-2 border-black shadow-sm' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-2xl mb-1">{ess.icon}</div>
                        <span className="truncate block font-bold text-xs text-blue-900">{ess.title}</span>
                        <span className="truncate block text-[10px] text-gray-600">{ess.subtitle}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Expanded Essential Detail Callout */}
                {selectedEssential !== null && (
                  <div className="mt-2.5 p-2.5 bg-yellow-50 border-2 border-black text-xs space-y-1 flex justify-between items-start">
                    <div>
                      <span className="font-bold text-blue-950 uppercase block">
                        {WALLY_ESSENTIALS[selectedEssential].title} // {WALLY_ESSENTIALS[selectedEssential].subtitle}
                      </span>
                      <p className="text-gray-800 leading-relaxed">
                        {WALLY_ESSENTIALS[selectedEssential].desc}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEssential(null)}
                      className="text-xs font-bold px-1.5 py-0.5 bg-gray-200 border border-black hover:bg-gray-300 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Dynamic View: Wizard / Lab / Routine / Guestbook / FAQ */}
            {activeTab === 'wizard' && (
              <Wizard
                onOpenReceipt={() => setReceiptOpen(true)}
                intakeData={intakeData}
                setIntakeData={setIntakeData}
                onGoToTab={(t) => handleTabChange(t as typeof activeTab)}
              />
            )}

            {activeTab === 'lab' && <NasmLab />}

            {activeTab === 'routine' && <RoutinePreview />}

            {activeTab === 'guestbook' && <Guestbook />}

            {activeTab === 'faq' && <FaqManifesto />}

            {/* Specialties & Philosophy Section */}
            <section className="pixel-border bg-white p-4 font-courier">
              <div className="flex justify-between items-center bg-[#000080] text-white px-2 py-1 mb-3">
                <h2 className="text-sm sm:text-base font-black uppercase font-vt323 tracking-wide">
                  📁 SPECIALTIES & PHILOSOPHY // WHO WALLY COACHES
                </h2>
                <span className="text-[10px] bg-yellow-300 text-black px-1 font-bold">
                  NASM KINETIC CHAIN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {SPECIALTIES.map((spec, idx) => (
                  <div key={idx} className="pixel-border-inset p-2.5 bg-gray-50 space-y-1 hover:bg-gray-100 transition-colors">
                    <span className="font-bold block text-blue-900 text-xs">
                      {spec.icon} {spec.title}
                    </span>
                    <p className="text-gray-800 font-medium leading-relaxed">{spec.blurb}</p>
                    <p className="text-[11px] text-gray-600 leading-normal border-t border-gray-300 pt-1">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Visitor Counter & Geocities Webrings Section */}
            <section className="pixel-border bg-black text-white p-4 text-center font-courier space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs tracking-wider font-mono uppercase text-gray-400">
                  VISITOR COUNTER:
                </span>
                <button
                  type="button"
                  onClick={incrementVisitor}
                  title="Click to click-stamp counter!"
                  className="inline-flex space-x-1 bg-gray-900 border-2 border-gray-600 px-3 py-1 font-mono text-xl text-[#00ff00] font-black cursor-pointer hover:border-[#00ff00]"
                >
                  {String(visitorCount)
                    .padStart(6, '0')
                    .split('')
                    .map((digit, i) => (
                      <span key={i} className="inline-block px-0.5 bg-black/60 border border-gray-800">
                        {digit}
                      </span>
                    ))}
                </button>
              </div>

              <p className="text-xs text-yellow-300 italic">
                "I aced gym but flunked computers, what can I say." — Wally
              </p>

              {/* 90s Web Badges */}
              <div className="pt-2 border-t border-gray-800 flex flex-wrap justify-center gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-gray-900 border border-gray-700 text-gray-300">
                  ⚡ BEST VIEWED IN 800x600
                </span>
                <span className="px-2 py-0.5 bg-green-950 border border-green-700 text-green-300">
                  🛡️ 100% ORGANIC HUMAN INTELLIGENCE
                </span>
                <span className="px-2 py-0.5 bg-blue-950 border border-blue-700 text-blue-300">
                  📐 NASM CERTIFIED
                </span>
                <span className="px-2 py-0.5 bg-yellow-950 border border-yellow-700 text-yellow-300">
                  ☕ POWERED BY BLACK COFFEE & CHALK
                </span>
              </div>
            </section>

          </main>
        )}
      </div>

      {/* Windows 98 Bottom Taskbar */}
      <footer className="w-full bg-[#c0c0c0] border-t-2 border-white border-b border-black p-1 text-xs select-none sticky bottom-0 z-40 flex items-center justify-between font-courier shadow-md">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              retroAudio.playClick();
              if (isMinimized) setIsMinimized(false);
              else handleTabChange('wizard');
            }}
            className="win98-btn px-2.5 py-1 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <span className="text-red-600">❖</span>
            <span>Start</span>
          </button>

          <div
            onClick={() => {
              retroAudio.playClick();
              setIsMinimized(!isMinimized);
            }}
            className={`px-3 py-1 text-xs font-bold border border-black cursor-pointer truncate max-w-[200px] sm:max-w-xs flex items-center gap-1 ${
              !isMinimized ? 'bg-white shadow-inner' : 'bg-gray-300 win98-btn'
            }`}
          >
            <span>🌐</span>
            <span className="truncate">Sweat & Joy // Retro Lab</span>
          </div>
        </div>

        {/* Taskbar Tray */}
        <div className="win98-sunken px-2 py-0.5 flex items-center gap-2 text-[11px] text-gray-800">
          <button
            onClick={toggleSound}
            className="hover:text-black cursor-pointer"
            title="Toggle Sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <span className="hidden sm:inline">56.6K MODEM</span>
          <span className="font-mono font-bold">12:00 PM</span>
        </div>
      </footer>

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        intakeData={intakeData}
        selectedPlan={selectedPlanObj}
        discount={0}
        finalPrice={selectedPlanObj.price}
      />

      {/* Retro Dialogs */}
      <RetroDialog
        isOpen={dialogState !== null}
        type={dialogState}
        onClose={() => setDialogState(null)}
        onConfirmClose={() => setIsMinimized(true)}
      />
    </div>
  );
}
