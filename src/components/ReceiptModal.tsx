import React from 'react';
import { IntakeData, Plan } from '../types';
import { retroAudio } from '../utils/audio';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  intakeData: IntakeData;
  selectedPlan: Plan;
  discount: number;
  finalPrice: number;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  intakeData,
  selectedPlan,
  discount,
  finalPrice
}) => {
  if (!isOpen) return null;

  const orderId = `SJ-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const downloadTxt = () => {
    retroAudio.playClick();
    const content = `
============================================================
           SWEAT & JOY FITNESS // RETRO COACHING LAB
           OFFICIAL CLIENT INTAKE & TRANSMISSION SLIP
============================================================
ORDER REF     : ${orderId}
DATE          : ${dateStr}
COACH         : Wally (NASM Certified, Zero-AI Human Coach)
HEADQUARTERS  : http://geocities.com/sweat_and_joy_fitness/

CLIENT DETAILS:
- Name        : ${intakeData.clientName || 'Fitness Explorer'}
- Email       : ${intakeData.clientEmail || 'N/A'}
- Training Env: ${intakeData.env}
- Core Goal   : ${intakeData.goal}
- Frequency   : ${intakeData.daysPerWeek} days/week
- Limitations : ${intakeData.aches.length > 0 ? intakeData.aches.join(', ') : 'None reported'}

COACHING PLAN:
- Plan        : ${selectedPlan.name}
- Billing     : $${selectedPlan.price}.00 ${selectedPlan.billingPeriod}
${discount > 0 ? `- Promo Code : -$${discount}.00 Applied\n` : ''}- Total Paid  : $${finalPrice}.00

WALLY'S ZERO-SLOP PLEDGE:
"Every rep cue is handwritten. Every video analyzed by two human eyes.
No automated chatbots. Your custom program will arrive within 48 hours."

STATUS        : TRANSMITTED TO WALLY'S DESK (READY FOR INTAKE)
============================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SweatAndJoy_Intake_${orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    retroAudio.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 font-courier">
      <div className="pixel-border bg-white max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Window Header */}
        <div className="window-header px-2 py-1 flex justify-between items-center text-sm font-vt323 select-none">
          <span className="font-bold flex items-center gap-1">
            <span>📄</span> INTAKE_SLIP_{orderId}.TXT - NOTEPAD
          </span>
          <button
            onClick={() => {
              retroAudio.playClick();
              onClose();
            }}
            className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white border border-black text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Paper Content */}
        <div className="p-4 overflow-y-auto space-y-3 text-xs bg-[#fffffa] text-black">
          <div className="text-center border-b-2 border-dashed border-black pb-2">
            <h2 className="font-black text-base uppercase tracking-tight">SWEAT & JOY FITNESS</h2>
            <p className="text-[11px] text-gray-700 italic">"Your life. Your goals. Your schedule."</p>
            <p className="text-[10px] text-gray-600 mt-0.5">Wally's Desk // NASM Virtual Coaching Lab</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-gray-300 pb-2">
            <div>
              <span className="font-bold block text-gray-600">ORDER NO:</span>
              <span className="font-mono font-bold text-black">{orderId}</span>
            </div>
            <div>
              <span className="font-bold block text-gray-600">DATE:</span>
              <span className="font-bold text-black">{dateStr}</span>
            </div>
            <div>
              <span className="font-bold block text-gray-600">CLIENT:</span>
              <span className="font-bold text-black">{intakeData.clientName || 'Fitness Explorer'}</span>
            </div>
            <div>
              <span className="font-bold block text-gray-600">EMAIL:</span>
              <span className="font-bold text-black truncate block">{intakeData.clientEmail || 'N/A'}</span>
            </div>
          </div>

          <div className="space-y-1 text-[11px] bg-gray-50 p-2 pixel-border-inset">
            <div className="flex justify-between">
              <span className="font-bold">PLAN:</span>
              <span>{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">TRAINING SETUP:</span>
              <span>{intakeData.env}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">PRIMARY GOAL:</span>
              <span>{intakeData.goal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">WEEKLY COMMITTED:</span>
              <span>{intakeData.daysPerWeek} days / week</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">NOTED ACHES:</span>
              <span>{intakeData.aches.length > 0 ? intakeData.aches.join(', ') : 'None'}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-700 font-bold">
                <span>PROMO DISCOUNT:</span>
                <span>-${discount}.00</span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-gray-300 font-black text-sm text-blue-900">
              <span>TOTAL BILLED:</span>
              <span>${finalPrice}.00 {selectedPlan.billingPeriod}</span>
            </div>
          </div>

          <div className="border border-black p-2 bg-yellow-50 text-[10px] space-y-1">
            <span className="font-bold block text-black">★ 100% ORGANIC HUMAN COACHING APPROVED</span>
            <p className="text-gray-700">
              Your intake was routed to Wally's physical spiral notebook. Expect your custom program link & assessment form via email in 48 hours.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-2 bg-gray-200 border-t-2 border-black flex flex-wrap justify-end gap-2 text-xs">
          <button
            onClick={downloadTxt}
            className="pixel-btn px-3 py-1 text-black font-bold uppercase bg-yellow-200 hover:bg-yellow-300"
          >
            💾 SAVE AS .TXT
          </button>
          <button
            onClick={handlePrint}
            className="pixel-btn px-3 py-1 text-black font-bold uppercase bg-blue-200 hover:bg-blue-300"
          >
            🖨️ PRINT SLIP
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              onClose();
            }}
            className="pixel-btn px-3 py-1 text-black font-bold uppercase bg-gray-300 hover:bg-gray-400"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
