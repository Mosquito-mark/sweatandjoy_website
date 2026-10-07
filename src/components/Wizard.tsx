import React, { useState } from 'react';
import { Plan, IntakeData, TrainingEnv, DemographicGoal } from '../types';
import { PLANS } from '../data/coachingData';
import { retroAudio } from '../utils/audio';

interface WizardProps {
  onOpenReceipt: () => void;
  intakeData: IntakeData;
  setIntakeData: React.Dispatch<React.SetStateAction<IntakeData>>;
  onGoToTab: (tabId: string) => void;
}

export const Wizard: React.FC<WizardProps> = ({
  onOpenReceipt,
  intakeData,
  setIntakeData,
  onGoToTab
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [promoInput, setPromoInput] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const selectedPlan = PLANS.find((p) => p.id === intakeData.planId) || PLANS[1];

  const handleSelectPlan = (plan: Plan) => {
    retroAudio.playClick();
    setIntakeData((prev) => ({ ...prev, planId: plan.id }));
  };

  const handleSelectEnv = (env: TrainingEnv) => {
    retroAudio.playClick();
    setIntakeData((prev) => ({ ...prev, env }));
  };

  const handleToggleAche = (ache: string) => {
    retroAudio.playClick();
    setIntakeData((prev) => {
      const exists = prev.aches.includes(ache);
      return {
        ...prev,
        aches: exists ? prev.aches.filter((a) => a !== ache) : [...prev.aches, ache]
      };
    });
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'NO_SLOP' || code === 'NOSLOP') {
      setDiscount(10);
      setPromoMessage('PROMO CODE APPLIED: -$10.00 (Zero AI Discount!)');
      retroAudio.playChime();
    } else if (code === 'WALLY1999') {
      setDiscount(15);
      setPromoMessage('PROMO CODE APPLIED: -$15.00 (Y2K Vintage Special!)');
      retroAudio.playChime();
    } else if (code === 'RETRO') {
      setDiscount(5);
      setPromoMessage('PROMO CODE APPLIED: -$5.00 (Geocities Bonus)');
      retroAudio.playChime();
    } else {
      setDiscount(0);
      setPromoMessage('INVALID CODE. Try: NO_SLOP or WALLY1999');
      retroAudio.playAlert();
    }
  };

  const goToStep = (step: number) => {
    setFormError('');
    if (step === 3 && currentStep === 2) {
      if (!intakeData.clientName.trim()) {
        setFormError('Please enter your name so Wally knows who to address!');
        retroAudio.playAlert();
        return;
      }
      if (!intakeData.clientEmail.trim() || !intakeData.clientEmail.includes('@')) {
        setFormError('Please provide a valid email address for program transmission!');
        retroAudio.playAlert();
        return;
      }
    }
    retroAudio.playClick();
    setCurrentStep(step);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleCompleteOrder = () => {
    retroAudio.playSuccess();
    setIsSuccess(true);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleReset = () => {
    retroAudio.playClick();
    setIsSuccess(false);
    setCurrentStep(1);
    setIntakeData({
      planId: 'basic',
      env: 'Full Gym Access',
      goal: 'Beginner Foundation',
      daysPerWeek: 3,
      aches: [],
      clientName: '',
      clientEmail: '',
      notes: ''
    });
    setDiscount(0);
    setPromoInput('');
    setPromoMessage('');
  };

  const finalPrice = Math.max(0, selectedPlan.price - discount);

  return (
    <section className="pixel-border bg-white p-3 sm:p-4 font-courier">
      {/* Wizard Header Bar */}
      <div className="window-header px-2 py-1 mb-3 flex justify-between items-center text-xs sm:text-sm select-none">
        <span className="font-bold flex items-center gap-1.5 font-vt323 tracking-wide">
          <span>📁</span> INTERACTIVE WIZARD // INTAKE & VIRTUAL ENROLLMENT
        </span>
        <span className="text-[11px] bg-yellow-300 text-black px-1.5 py-0.5 font-bold border border-black font-courier">
          {isSuccess ? 'STATUS: TRANSMITTED' : `STEP ${currentStep} OF 3`}
        </span>
      </div>

      {/* Retro Segmented Progress Bar */}
      <div className="mb-4 bg-gray-200 border-2 border-black p-1">
        <div
          className="bg-blue-800 h-3 transition-all duration-300"
          style={{
            width: isSuccess ? '100%' : currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'
          }}
        />
      </div>

      {/* STEP 1: PLAN SELECTOR */}
      {!isSuccess && currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-100 p-1.5 border border-black">
            <h2 className="text-xs sm:text-sm font-bold uppercase">1. Select Your Coaching Plan</h2>
            <button
              onClick={() => {
                retroAudio.playClick();
                setShowMatrix(!showMatrix);
              }}
              className="text-[10px] font-bold underline text-blue-900 cursor-pointer"
            >
              {showMatrix ? '▲ Hide Comparison Table' : '▼ View Features Matrix'}
            </button>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLANS.map((plan) => {
              const isSelected = plan.id === intakeData.planId;
              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`cursor-pointer pixel-border-inset p-3 transition-all flex flex-col justify-between ${
                    isSelected ? 'bg-blue-50 border-2 border-black shadow-md' : 'bg-yellow-50 hover:bg-yellow-100'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-xs uppercase text-blue-900">{plan.name}</div>
                      {plan.popular && (
                        <span className="bg-black text-yellow-300 text-[9px] px-1 font-bold border border-black">
                          WALLY RECOMMENDS
                        </span>
                      )}
                    </div>

                    <div className="text-xl font-black mt-2 text-black">
                      ${plan.price}{' '}
                      <span className="text-[10px] font-normal text-gray-700">
                        {plan.billingPeriod === 'one-time' ? 'one-time' : '/ month'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-700 mt-2 leading-relaxed">{plan.description}</p>

                    <div className="mt-3 pt-2 border-t border-dashed border-gray-400 space-y-1">
                      {plan.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="text-[10px] text-gray-800 flex items-start gap-1">
                          <span className="text-green-700 font-bold">✓</span>
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`mt-3 text-xs font-bold text-center py-1 border border-black select-none ${
                      isSelected
                        ? 'bg-black text-yellow-300'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {isSelected ? 'SELECTED [X]' : 'SELECT [O]'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Matrix Drawer */}
          {showMatrix && (
            <div className="pixel-border-inset p-3 bg-gray-50 text-[11px] space-y-2">
              <h3 className="font-bold uppercase text-black border-b border-black pb-1">
                Detailed Plan Features Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-400 text-[10px] text-gray-600 uppercase">
                      <th className="py-1">Feature</th>
                      <th className="py-1 text-center">Trial ($75)</th>
                      <th className="py-1 text-center">Basic ($60/mo)</th>
                      <th className="py-1 text-center">Premium ($95/mo)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-[10px]">
                    <tr>
                      <td className="py-1 font-medium">Kinetic Chain Movement Screen</td>
                      <td className="py-1 text-center font-bold text-green-700">[X]</td>
                      <td className="py-1 text-center font-bold text-green-700">[X]</td>
                      <td className="py-1 text-center font-bold text-green-700">[X]</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Personalized 4-Week Custom Program</td>
                      <td className="py-1 text-center font-bold text-green-700">[X]</td>
                      <td className="py-1 text-center font-bold text-green-700">[X]</td>
                      <td className="py-1 text-center font-bold text-green-700">[X]</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Smartphone Logging App Access</td>
                      <td className="py-1 text-center font-bold text-green-700">[X] (4 wks)</td>
                      <td className="py-1 text-center font-bold text-green-700">[X] Continuous</td>
                      <td className="py-1 text-center font-bold text-green-700">[X] Continuous</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Video Form Reviews</td>
                      <td className="py-1 text-center">1 Initial</td>
                      <td className="py-1 text-center">Bi-Weekly</td>
                      <td className="py-1 text-center font-bold text-blue-900">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Messaging Support Response Time</td>
                      <td className="py-1 text-center">48 Hours</td>
                      <td className="py-1 text-center">48 Hours</td>
                      <td className="py-1 text-center font-bold text-blue-900">Priority 24h</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Contract or Auto-Renew Trap</td>
                      <td className="py-1 text-center text-red-600 font-bold">ZERO</td>
                      <td className="py-1 text-center text-red-600 font-bold">ZERO</td>
                      <td className="py-1 text-center text-red-600 font-bold">ZERO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-between items-center">
            <span className="text-[11px] text-gray-600 italic">
              *All plans include Wally’s 100% human-crafted programming guarantee.
            </span>
            <button
              onClick={() => goToStep(2)}
              className="pixel-btn px-4 py-2 text-xs font-bold uppercase bg-yellow-300 hover:bg-yellow-400 text-black flex items-center gap-1"
            >
              NEXT: MICRO-INTAKE WIZARD →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: MICRO-INTAKE QUIZ */}
      {!isSuccess && currentStep === 2 && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-1.5 border border-black flex justify-between items-center">
            <h2 className="text-xs sm:text-sm font-bold uppercase">2. Micro-Intake Questionnaire</h2>
            <span className="text-[10px] text-gray-600">Takes under 60 seconds</span>
          </div>

          {formError && (
            <div className="p-2 bg-red-100 border-2 border-red-600 text-red-900 text-xs font-bold flex items-center gap-2">
              <span>⚠️</span>
              <span>{formError}</span>
            </div>
          )}

          {/* Training Environment */}
          <div>
            <label className="block text-xs font-bold mb-1.5">Where will you primarily train?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: 'Full Gym Access', icon: '🏋️', label: 'Full Gym' },
                  { id: 'Home / Minimal Gear', icon: '🏠', label: 'Home Setup' },
                  { id: 'Zero Gear / Bodyweight', icon: '🤸', label: 'Zero Gear' },
                  { id: 'Hybrid / Workplace', icon: '🏢', label: 'Work / Hybrid' }
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectEnv(item.id)}
                  className={`pixel-border-inset p-2 text-left text-xs transition-colors ${
                    intakeData.env === item.id
                      ? 'bg-yellow-200 font-bold border-2 border-black'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="block text-base">{item.icon}</span>
                  <span className="block mt-1 truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Goal & Weekly Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">Primary Focus / Demographic:</label>
              <select
                value={intakeData.goal}
                onChange={(e) =>
                  setIntakeData((prev) => ({
                    ...prev,
                    goal: e.target.value as DemographicGoal
                  }))
                }
                className="w-full p-1.5 text-xs pixel-border-inset bg-white cursor-pointer font-courier"
              >
                <option value="Beginner Foundation">Beginner Foundation (Learn the Basics)</option>
                <option value="Post-Physio Recovery">Post-Physio Recovery (Joints & Safety)</option>
                <option value="Desk Worker Posture">Desk Worker Posture (Hunch & Neck Fix)</option>
                <option value="Manual Labourer Aches">Manual Labourer Aches (Spine & Fatigue)</option>
                <option value="Gender Diverse Journey">Gender Diverse Journey (Affirming Silhouette)</option>
                <option value="Senior Joint Vitality">Senior Joint Vitality (Balance & Strength)</option>
                <option value="Unconventional Goals">Unconventional Goals (Hobbies / Endurance)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Weekly Training Frequency:</label>
              <div className="grid grid-cols-4 gap-1">
                {[2, 3, 4, 5].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => {
                      retroAudio.playClick();
                      setIntakeData((prev) => ({ ...prev, daysPerWeek: days }));
                    }}
                    className={`p-1.5 text-xs text-center border font-bold ${
                      intakeData.daysPerWeek === days
                        ? 'bg-blue-800 text-yellow-300 border-black'
                        : 'bg-white text-black border-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Nagging Aches Checklist */}
          <div>
            <label className="block text-xs font-bold mb-1">
              Any nagging aches or joint concerns? (Wally adjusts exercise selection):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              {[
                'Lower Back Stiffness',
                'Neck & Shoulder Tension',
                'Cranky Knees',
                'Wrist / Elbow Strain'
              ].map((ache) => {
                const checked = intakeData.aches.includes(ache);
                return (
                  <button
                    key={ache}
                    type="button"
                    onClick={() => handleToggleAche(ache)}
                    className={`p-1.5 text-left border text-[11px] flex items-center gap-1.5 ${
                      checked
                        ? 'bg-yellow-100 border-black font-bold'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>{checked ? '[X]' : '[ ]'}</span>
                    <span className="truncate">{ache}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">
                Your Full Name: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={intakeData.clientName}
                onChange={(e) =>
                  setIntakeData((prev) => ({ ...prev, clientName: e.target.value }))
                }
                className="w-full p-1.5 text-xs pixel-border-inset bg-white font-courier"
                placeholder="e.g. Alex Mercer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">
                Email Address: <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                value={intakeData.clientEmail}
                onChange={(e) =>
                  setIntakeData((prev) => ({ ...prev, clientEmail: e.target.value }))
                }
                className="w-full p-1.5 text-xs pixel-border-inset bg-white font-courier"
                placeholder="alex@example.com"
              />
            </div>
          </div>

          {/* Note to Wally */}
          <div>
            <label className="block text-xs font-bold mb-1">
              Wally's Desk Notebook // Note for Wally (Optional):
            </label>
            <textarea
              rows={2}
              value={intakeData.notes}
              onChange={(e) =>
                setIntakeData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full p-1.5 text-xs pixel-border-inset bg-white font-courier"
              placeholder="Tell Wally anything else: previous surgeries, gym pet peeves, favorite lifts, or weird work hours..."
            />
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => goToStep(1)}
              className="pixel-btn px-3 py-1.5 text-xs font-bold uppercase bg-gray-300 hover:bg-gray-400"
            >
              ← BACK TO PLANS
            </button>
            <button
              onClick={() => goToStep(3)}
              className="pixel-btn px-4 py-2 text-xs font-bold uppercase bg-yellow-300 hover:bg-yellow-400 text-black"
            >
              PROCEED TO SECURE CHECKOUT →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SECURE SUMMARY & CHECKOUT */}
      {!isSuccess && currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-1.5 border border-black flex justify-between items-center">
            <h2 className="text-xs sm:text-sm font-bold uppercase">3. Secure Summary & Checkout</h2>
            <span className="text-[10px] text-green-800 font-bold">128-BIT ENCRYPTED</span>
          </div>

          {/* Itemized Review Box */}
          <div className="pixel-border-inset p-3 bg-gray-50 text-xs space-y-2">
            <div className="flex justify-between border-b border-gray-300 pb-1.5">
              <span className="text-gray-600">Selected Plan:</span>
              <span className="font-bold text-black">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1.5">
              <span className="text-gray-600">Client Name:</span>
              <span className="font-bold text-black">{intakeData.clientName || 'Anonymous'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1.5">
              <span className="text-gray-600">Client Email:</span>
              <span className="font-bold text-black">{intakeData.clientEmail}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1.5">
              <span className="text-gray-600">Training Setup:</span>
              <span className="font-bold text-black">{intakeData.env}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1.5">
              <span className="text-gray-600">Primary Goal:</span>
              <span className="font-bold text-black">{intakeData.goal}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-1.5">
              <span className="text-gray-600">Frequency:</span>
              <span className="font-bold text-black">{intakeData.daysPerWeek} days / week</span>
            </div>
            {intakeData.aches.length > 0 && (
              <div className="flex justify-between border-b border-gray-300 pb-1.5">
                <span className="text-gray-600">Nagging Aches:</span>
                <span className="font-bold text-amber-900">{intakeData.aches.join(', ')}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between border-b border-gray-300 pb-1.5 text-green-700 font-bold">
                <span>Promo Discount:</span>
                <span>-${discount}.00</span>
              </div>
            )}
            <div className="flex justify-between pt-1 text-sm font-black text-blue-900">
              <span>Total Due Today:</span>
              <span>
                ${finalPrice}.00{' '}
                <span className="text-xs font-normal text-gray-600">
                  {selectedPlan.billingPeriod}
                </span>
              </span>
            </div>
          </div>

          {/* Promo Code Box */}
          <form onSubmit={applyPromo} className="flex gap-2 items-center bg-gray-100 p-2 border border-black text-xs">
            <span className="font-bold whitespace-nowrap">PROMO CODE:</span>
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="e.g. NO_SLOP or WALLY1999"
              className="p-1 pixel-border-inset bg-white uppercase flex-1 font-mono text-xs"
            />
            <button
              type="submit"
              className="pixel-btn px-2.5 py-1 text-xs font-bold uppercase bg-yellow-200"
            >
              APPLY
            </button>
          </form>
          {promoMessage && (
            <p className="text-[11px] font-bold text-blue-900 px-1">{promoMessage}</p>
          )}

          {/* Guarantee Banner */}
          <div className="p-2.5 bg-yellow-100 border-2 border-black text-[11px] space-y-1">
            <span className="font-bold text-black block">🛡️ WALLY'S ZERO-SLOP GUARANTEE:</span>
            <p className="text-gray-800 leading-relaxed">
              No automated AI code, no hidden auto-renew surprises. You decide when to continue. Program delivered directly to your inbox in 2 business days.
            </p>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button
              onClick={() => goToStep(2)}
              className="pixel-btn px-3 py-1.5 text-xs font-bold uppercase bg-gray-300 hover:bg-gray-400"
            >
              ← EDIT INTAKE
            </button>
            <button
              onClick={handleCompleteOrder}
              className="pixel-btn px-5 py-2.5 text-xs font-bold uppercase bg-green-400 hover:bg-green-500 text-black border-2 border-black shadow-md flex items-center gap-1.5"
            >
              <span>🔒</span>
              <span>[COMPLETE SECURE ENROLLMENT]</span>
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS STATE */}
      {isSuccess && (
        <div className="text-center space-y-4 py-4">
          <div className="p-4 bg-green-100 border-2 border-black space-y-2 text-left">
            <div className="flex items-center gap-2 text-green-900 border-b border-black pb-2">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="text-base font-black uppercase">
                  ORDER CONFIRMED! INTAKE TRANSMITTED TO WALLY
                </h3>
                <p className="text-xs text-gray-700">Official Sweat & Joy Client Packet Logged</p>
              </div>
            </div>

            <p className="text-xs text-gray-800 leading-relaxed pt-1">
              Thanks, <strong className="text-black">{intakeData.clientName || 'Friend'}</strong>! Your intake questionnaire was transmitted directly to Wally's physical desk notebook.
            </p>
            <p className="text-xs text-gray-800 leading-relaxed">
              Check your inbox (<strong className="text-blue-900">{intakeData.clientEmail}</strong>) within 2 business days for your NASM movement screen review, smartphone app invite link, and personalized Week 1 routine.
            </p>

            <div className="bg-white p-2.5 pixel-border-inset mt-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="font-bold">PLAN:</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">ENVIRONMENT:</span>
                <span>{intakeData.env}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">TOTAL BILLED:</span>
                <span className="font-bold text-green-800">${finalPrice}.00 {selectedPlan.billingPeriod}</span>
              </div>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => {
                retroAudio.playClick();
                onOpenReceipt();
              }}
              className="pixel-btn px-4 py-2 text-xs font-bold uppercase bg-yellow-300 hover:bg-yellow-400 text-black flex items-center gap-1"
            >
              <span>📄</span>
              <span>VIEW / PRINT OFFICIAL RECEIPT</span>
            </button>

            <button
              onClick={() => {
                retroAudio.playNav();
                onGoToTab('routine');
              }}
              className="pixel-btn px-4 py-2 text-xs font-bold uppercase bg-blue-300 hover:bg-blue-400 text-black flex items-center gap-1"
            >
              <span>📋</span>
              <span>PREVIEW SAMPLE ROUTINE</span>
            </button>

            <button
              onClick={() => {
                retroAudio.playNav();
                onGoToTab('lab');
              }}
              className="pixel-btn px-4 py-2 text-xs font-bold uppercase bg-purple-200 hover:bg-purple-300 text-black flex items-center gap-1"
            >
              <span>🔬</span>
              <span>TEST NASM POSTURE LAB</span>
            </button>

            <button
              onClick={handleReset}
              className="pixel-btn px-4 py-2 text-xs font-bold uppercase bg-gray-200 hover:bg-gray-300 text-black"
            >
              START NEW INTAKE
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
