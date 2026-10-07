import React from 'react';

interface RetroMarqueeProps {
  text?: string;
  className?: string;
}

export const RetroMarquee: React.FC<RetroMarqueeProps> = ({
  text = '*** WELCOME TO SWEAT & JOY FITNESS *** NO-BS VIRTUAL COACHING & NASM ASSESSMENTS *** WALLY AIN\'T NEVER USED AI & AIN\'T ABOUT TO START *** YOUR LIFE. YOUR GOALS. YOUR SCHEDULE. *** 100% ORGANIC HUMAN INTELLIGENCE *** ZERO SLOP ***',
  className = ''
}) => {
  return (
    <div
      className={`bg-black text-[#00ff00] py-1 px-2 font-mono text-xs sm:text-sm overflow-hidden select-none border-b-2 border-black flex items-center ${className}`}
      title="Hover to pause ticker"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-bold tracking-wider uppercase pr-12">{text}</span>
        <span className="font-bold tracking-wider uppercase pr-12">{text}</span>
      </div>
    </div>
  );
};
