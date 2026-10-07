import React from 'react';
import { retroAudio } from '../utils/audio';

interface RetroDialogProps {
  isOpen: boolean;
  type: 'close_confirm' | 'about_wally' | 'copy_alert' | null;
  onClose: () => void;
  onConfirmClose?: () => void;
}

export const RetroDialog: React.FC<RetroDialogProps> = ({
  isOpen,
  type,
  onClose,
  onConfirmClose
}) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 font-courier">
      <div className="win98-box max-w-sm w-full shadow-2xl p-1 select-none">
        {/* Title bar */}
        <div className="window-header px-2 py-1 flex justify-between items-center text-sm font-vt323">
          <span className="font-bold flex items-center gap-1.5">
            <span>⚠️</span>
            {type === 'close_confirm' && 'MICROSOFT INTERNET EXPLORER - WARNING'}
            {type === 'about_wally' && 'ABOUT SWEAT & JOY FITNESS'}
            {type === 'copy_alert' && 'SYSTEM NOTIFICATION'}
          </span>
          <button
            onClick={() => {
              retroAudio.playClick();
              onClose();
            }}
            className="px-1 bg-gray-300 text-black border border-black text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Dialog body */}
        <div className="p-4 bg-[#c0c0c0] space-y-3 text-xs text-black">
          {type === 'close_confirm' && (
            <div className="flex gap-3 items-start">
              <span className="text-3xl">🛑</span>
              <div className="space-y-1">
                <p className="font-bold">Wait! Are you sure you want to close Sweat & Joy?</p>
                <p className="text-[11px] text-gray-800">
                  Leaving now means skipping your daily corrective thoracic stretch! Wally is waiting to help your joints.
                </p>
              </div>
            </div>
          )}

          {type === 'about_wally' && (
            <div className="flex gap-3 items-start">
              <span className="text-3xl">🏋️</span>
              <div className="space-y-1">
                <p className="font-bold">SWEAT & JOY // RETRO LAB v5.5</p>
                <p className="text-[11px] text-gray-800">
                  Crafted by Coach Wally with 100% human intelligence. Certified NASM Personal Trainer & Corrective Exercise Specialist.
                </p>
                <p className="text-[10px] text-gray-600 mt-1">
                  "I aced gym but flunked computers, what can I say."
                </p>
              </div>
            </div>
          )}

          {type === 'copy_alert' && (
            <div className="flex gap-3 items-start">
              <span className="text-3xl">📋</span>
              <div className="space-y-1">
                <p className="font-bold">CLIPBOARD UPDATED!</p>
                <p className="text-[11px] text-gray-800">
                  Wally's direct coaching email (<strong>wally@sweatandjoyfitness.example.com</strong>) has been copied to your clipboard.
                </p>
              </div>
            </div>
          )}

          {/* Dialog buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-400">
            {type === 'close_confirm' ? (
              <>
                <button
                  onClick={() => {
                    retroAudio.playClick();
                    onClose();
                  }}
                  className="win98-btn px-4 py-1 text-xs font-bold"
                >
                  STAY IN LAB
                </button>
                <button
                  onClick={() => {
                    retroAudio.playAlert();
                    if (onConfirmClose) onConfirmClose();
                    onClose();
                  }}
                  className="win98-btn px-4 py-1 text-xs font-bold text-red-900"
                >
                  MINIMIZE
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  retroAudio.playClick();
                  onClose();
                }}
                className="win98-btn px-4 py-1 text-xs font-bold"
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
