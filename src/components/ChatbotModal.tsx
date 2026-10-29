import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundSystem';

const KNOWLEDGE_BASE: Record<string, string> = {
  bitca: 'BitCA v2.4 is the official tech club of the Department of Computer Applications at K.C. College, under HSNC University. We explore emerging tech, AI, cloud engineering, and hands-on workshops.',
  visionexa: 'Visionexa is our flagship inter-collegiate tech fest featuring seven dimensional universes: Techverse, Gameverse, Vibeverse, AIverse, Cyberverse, Humanverse, and Metaverse with competitive prize pools!',
  'kc college': 'K.C. College is a premier heritage institution in Churchgate, Mumbai, operating under HSNC University.',
  principal: 'Dr. Tejashree V. Shanbhag is the I/C Principal of K.C. College, bringing 30+ years of scholarly excellence and guidance.',
  vc: 'Dr. Hemlata K. Baghla is the Vice Chancellor of HSNC University. She completed her Ph.D. at age 25, has published over 200 research papers, and holds the honorary rank of Colonel.',
  geeta: 'Ms. Geeta Brijwani is the Coordinator for BCA (M.Sc, M.Phil, MBA) and has guided hundreds of students to tech industry leadership.',
  hackathon: 'The Visionexa 24h Hackathon challenges teams of 2-4 to build functional tech prototypes. Prize pool is ₹15,000 + trophy + certificates!',
  'squid game': 'The Squid Game Survival Trials feature 5 intense challenge rounds: Ddakji, Blindfold Maze, Flip Stones, Marbles, and the Escape Room.',
  roboverse: 'Roboverse is our robotics and AI hardware exhibition on Day 1 in the Tech Exhibition Hall.',
  events: 'Our 7 Universes host over 24 events: Hackathons, Console Esports, Battle Royale, Spotlight Jam, Dance Cyphers, CTF Security, and VR Immersions!'
};

export const ChatbotModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'bot' | 'user' }>>([
    {
      text: 'Greetings! I am the BitCA AI Assistant. Ask me about our 7 Universes, Visionexa fest events, K.C. College, or club activities!',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setPortalTarget(document.fullscreenElement || document.body);
    const handleFsChange = () => {
      setPortalTarget(document.fullscreenElement || document.body);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleSend = () => {
    const query = input.trim();
    if (!query) return;

    sound.playClick();
    const newMessages = [...messages, { text: query, sender: 'user' as const }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = "That's an intriguing question! I can provide info about our Seven Universes, Visionexa 2025/2026 events, registration procedures, K.C. College, or our leadership team. Try asking about 'Hackathon', 'Squid Game', or 'Universes'!";

      for (const [key, val] of Object.entries(KNOWLEDGE_BASE)) {
        if (lower.includes(key)) {
          reply = val;
        }
      }

      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }]);
    }, 450);
  };

  const content = (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] shadow-[0_0_25px_rgba(85,217,244,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer pointer-events-auto"
        aria-label="Toggle BitCA AI Chatbot"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chat Window (Glassy Dashboard V5 style) */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 glass-modal-v5 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 pointer-events-auto">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d1633]/80 to-[#121c40]/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-[#55d9f4]/20 text-[#55d9f4] border border-[#55d9f4]/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-['Montserrat']">BitCA AI Assistant</h4>
                <span className="text-[10px] text-[#33ff99] font-['DM_Mono'] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33ff99] animate-pulse" />
                  ONLINE // MULTIVERSE 404
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-72 sm:h-80 overflow-y-auto space-y-3 font-['Plus_Jakarta_Sans'] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-[#55d9f4]/20 text-[#55d9f4] flex items-center justify-center shrink-0 mt-0.5 border border-[#55d9f4]/30">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-medium shadow-md'
                      : 'glass-card-v5 text-white/90 border border-white/10'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area (16px text-base for mobile prevent auto-zoom) */}
          <div className="p-3 bg-black/40 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask reality a question..."
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-base sm:text-xs font-['DM_Mono'] focus:outline-none focus:border-[#55d9f4] transition-colors"
            />
            <button
              onClick={handleSend}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] font-bold hover:shadow-[0_0_15px_rgba(85,217,244,0.5)] transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );

  return portalTarget ? createPortal(content, portalTarget) : content;
};
