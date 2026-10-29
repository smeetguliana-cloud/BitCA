import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
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
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'bot' | 'user' }>>([
    {
      text: 'Greetings! I am the BitCA AI Assistant. Ask me about our 7 Universes, Visionexa fest events, K.C. College, or club activities!',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

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
          break;
        }
      }

      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }]);
    }, 450);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-[#55d9f4] to-[#8b7cff] text-[#050811] shadow-[0_0_25px_rgba(85,217,244,0.5)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        aria-label="Toggle BitCA AI Chatbot"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#090e1f]/95 backdrop-blur-2xl border border-[#55d9f4]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d1633] to-[#121c40] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#55d9f4]/20 text-[#55d9f4]">
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
              className="p-1 rounded-lg text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 font-['Plus_Jakarta_Sans'] text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#55d9f4]/20 text-[#55d9f4] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#55d9f4] text-[#050811] font-medium rounded-br-none'
                      : 'bg-white/[0.06] text-white/90 border border-white/10 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 bg-[#060a16] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about events, hackathon, KC College..."
              className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#55d9f4] text-white text-xs outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#55d9f4] text-[#050811] hover:bg-[#80e9ff] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
