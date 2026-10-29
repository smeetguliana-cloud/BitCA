import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { soundManager } from '../../lib/audio';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  bitca: 'BitCA v2.4 is the official tech club of the Department of Computer Applications at K.C. College, under HSNC University.',
  visionexa: 'Visionexa 2025 & 2026 is our flagship tech-cultural fest exploring MULTIVERSE 404. Events include Hackathon, Roboverse, AlgoRush, Console Esports, CTF, and cultural stages!',
  'kc college': 'K.C. College is a premier educational institution in South Mumbai, under HSNC University.',
  principal: 'Dr. Tejashree V. Shanbhag is the I/C Principal of K.C. College. She has over three decades of academic excellence and guides numerous research scholars.',
  vc: 'Dr. Hemlata K. Baghla is the Vice Chancellor of HSNC University. She holds a Ph.D. at 25, has over 200 published research papers, and holds the honorary rank of Colonel.',
  geeta: 'Ms. Geeta Brijwani is the Coordinator for BCA. With an M.Sc, M.Phil, and MBA, she has been integral in shaping the Computer Applications department.',
  'vice principal': 'Our esteemed Vice Principals include Dr. Shalini R. Sinha, Dr. Rajesh Samant, and Dr. Ritika Pathak.',
  hackathon: 'The 404 Hackathon is a full-stack sprint where teams build prototypes for reality-bending challenges and compete for grants + trophies!',
  roboverse: 'Roboverse & AI Showcase lets you demonstrate autonomous robotics and multi-agent neural systems.',
  'squid game': 'Squid Game & Survival Trials is an adrenaline-packed multi-stage challenge testing strategy, teamwork, and agility on Day 2!'
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Welcome to Multiverse 404! I am the BitCA AI Assistant. Ask me anything about our tech club, Visionexa events, K.C. College, or our faculty!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    soundManager.playClick();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Answer from knowledge base or fallback
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response =
        "That's a great question! I am best equipped to answer questions about BitCA v2.4, Visionexa fest events (like Hackathon, Code Matrix, Squid Game), K.C. College, and our faculty members. How can I help you explore?";

      for (const key in KNOWLEDGE_BASE) {
        if (lower.includes(key)) {
          response = KNOWLEDGE_BASE[key];
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: response
        }
      ]);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          soundManager.playClick();
          setIsOpen(!isOpen);
        }}
        aria-label="Toggle BitCA Assistant"
        className="chatbot-toggle hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container animate-fade-in">
          <div className="chatbot-header">
            <span>BitCA AI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
              className="hover:opacity-80 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`message ${m.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask reality a question..."
              className="text-base"
            />
            <button onClick={handleSend} aria-label="Send message">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
