
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { getTravelSuggestions } from '../services/geminiService';
import { useApp } from '../App';
import { ChatMessage } from '../types';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your PlanIt Broh travel assistant. Looking for recommendations or help planning your next trip?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { packages } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getTravelSuggestions(userMsg, packages);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="font-semibold">PlanIt Broh Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  <span className="text-sm text-slate-500">Planning your trip...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-grow bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="hidden sm:inline font-medium">Ask AI</span>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
