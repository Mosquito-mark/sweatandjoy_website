import React, { useState, useEffect } from 'react';
import { GuestbookEntry } from '../types';
import { INITIAL_GUESTBOOK } from '../data/coachingData';
import { retroAudio } from '../utils/audio';

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('sj_guestbook_entries');
      if (saved) return JSON.parse(saved);
    } catch {
      // safe fallback
    }
    return INITIAL_GUESTBOOK;
  });

  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [badge, setBadge] = useState('DESK WORKER');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sj_guestbook_entries', JSON.stringify(entries));
    } catch {
      // safe fallback
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      retroAudio.playAlert();
      return;
    }

    retroAudio.playSuccess();
    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Internet Web',
      date: new Date().toLocaleDateString('en-US'),
      rating,
      comment: comment.trim(),
      badge,
      wallyReply: `Wally says: Welcome to the Sweat & Joy squad, ${author}! Keep moving with intention!`
    };

    setEntries([newEntry, ...entries]);
    setAuthor('');
    setLocation('');
    setComment('');
    setThankYou(true);
    setTimeout(() => setThankYou(false), 4000);
  };

  return (
    <section className="pixel-border bg-white p-3 sm:p-4 font-courier space-y-4">
      {/* Header */}
      <div className="window-header px-2 py-1 flex justify-between items-center text-xs sm:text-sm select-none">
        <span className="font-bold flex items-center gap-1.5 font-vt323 tracking-wide">
          <span>📖</span> GEOCITIES GUESTBOOK // WALL OF CLIENT WINS
        </span>
        <button
          onClick={() => {
            retroAudio.playClick();
            setIsFormOpen(!isFormOpen);
          }}
          className="text-[10px] bg-yellow-300 text-black px-2 py-0.5 font-bold border border-black hover:bg-yellow-400"
        >
          {isFormOpen ? '▲ CLOSE SIGN-IN' : '✍️ SIGN GUESTBOOK'}
        </button>
      </div>

      {thankYou && (
        <div className="p-2 bg-green-200 border-2 border-black text-xs font-bold text-green-950 text-center">
          ★ THANKS FOR SIGNING THE SWEAT & JOY GUESTBOOK! ENTRY TRANSMITTED. ★
        </div>
      )}

      {/* Guestbook Sign Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="pixel-border-inset p-3 bg-yellow-50 space-y-2 text-xs">
          <h3 className="font-bold uppercase text-black border-b border-black pb-1">
            ✍️ Add Your Voice to the Wall of Wins:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold">Your Name / Handle:</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Sam R. (Graphic Designer)"
                className="w-full p-1 bg-white pixel-border-inset font-courier text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold">Location / City:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Portland, OR"
                className="w-full p-1 bg-white pixel-border-inset font-courier text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold">Your Demographic / Routine:</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full p-1 bg-white pixel-border-inset font-courier text-xs"
              >
                <option value="DESK WORKER">DESK WORKER</option>
                <option value="TRADE LABOURER">TRADE LABOURER</option>
                <option value="BEGINNER FOUNDATION">BEGINNER FOUNDATION</option>
                <option value="POST-PHYSIO">POST-PHYSIO</option>
                <option value="GENDER DIVERSE">GENDER DIVERSE</option>
                <option value="UNCONVENTIONAL">UNCONVENTIONAL GOALS</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold">Rating (Out of 5 Stars):</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-1 bg-white pixel-border-inset font-courier text-xs"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5/5 Wally Excellence)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5 Solid Lift)</option>
                <option value={3}>⭐⭐⭐ (3/5 Decent Sweat)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold">Your Message / Win Story:</label>
            <textarea
              required
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How has Wally's human coaching or corrective routines helped your body?"
              className="w-full p-1 bg-white pixel-border-inset font-courier text-xs"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="pixel-btn px-4 py-1.5 text-xs font-bold uppercase bg-yellow-300 hover:bg-yellow-400 text-black"
            >
              POST TO GUESTBOOK [ENTER]
            </button>
          </div>
        </form>
      )}

      {/* Guestbook Entries */}
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="pixel-border-inset p-3 bg-gray-50 text-xs space-y-1.5">
            <div className="flex justify-between items-start flex-wrap gap-1 border-b border-gray-300 pb-1">
              <div>
                <span className="font-bold text-blue-900">{entry.author}</span>
                <span className="text-[10px] text-gray-600 ml-1">({entry.location})</span>
              </div>
              <div className="flex items-center gap-2">
                {entry.badge && (
                  <span className="bg-black text-yellow-300 text-[9px] px-1 font-bold border border-black">
                    {entry.badge}
                  </span>
                )}
                <span className="text-[10px] text-gray-500 font-mono">{entry.date}</span>
              </div>
            </div>

            <div className="text-amber-600 text-xs tracking-widest">
              {'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}
            </div>

            <p className="text-gray-800 leading-relaxed italic">"{entry.comment}"</p>

            {entry.wallyReply && (
              <div className="bg-blue-50 border-l-2 border-l-blue-900 p-1.5 text-[11px] text-blue-950">
                <strong>{entry.wallyReply}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
