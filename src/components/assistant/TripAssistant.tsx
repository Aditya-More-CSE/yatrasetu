import React, { useState } from 'react';
import { X, Sparkles, Send, ArrowRight, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTrip } from '../../context/TripContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLabel?: string;
  actionTarget?: 'recovery' | 'impact';
  time: string;
}

export const TripAssistant: React.FC = () => {
  const { isAssistantOpen, setIsAssistantOpen, activeDisruption, isRecovered, selectedPlan, setActiveTab } = useTrip();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: "Hello! I'm your YatraSetu TripRescue assistant. Ask me anything about flight AI-142 delays, connection buffers, or dinner timing.",
      time: 'Just now',
    },
  ]);

  if (!isAssistantOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Formulate contextual response based on real trip state
    setTimeout(() => {
      let replyText = '';
      let actionLabel: string | undefined = undefined;
      let actionTarget: 'recovery' | 'impact' | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('city tour') || lower.includes('tour') || lower.includes('cruise')) {
        if (isRecovered) {
          replyText = `Yes! Under the ${selectedPlan?.name} plan, your tour has been safeguarded. ${
            selectedPlan?.id === 'plan-cheapest'
              ? 'It was rescheduled to tomorrow at 10:00 AM with zero stress.'
              : 'Your booking has been shifted to the 19:15 twilight sailing with priority boarding intact.'
          }`;
        } else if (activeDisruption) {
          replyText =
            'Probably not without action: your delayed flight pushes hotel arrival to 17:45, leaving only a 5-minute buffer before the Seine boat boarding at 18:30. I found 3 safer recovery alternatives.';
          actionLabel = 'View Recovery Options';
          actionTarget = 'recovery';
        } else {
          replyText = 'Your Paris City Tour & Seine Cruise is on schedule for 18:30 with plenty of buffer.';
        }
      } else if (lower.includes('transfer') || lower.includes('driver') || lower.includes('airport')) {
        if (isRecovered) {
          replyText =
            'Your transfer has been successfully re-dispatched to meet your flight at 16:55 at Terminal 2E with name-board service.';
        } else if (activeDisruption) {
          replyText =
            'Your original airport transfer was scheduled for 15:10, but your flight lands at 16:40. You have a -90 min negative buffer (impossible connection).';
          actionLabel = 'Explore Transfer Recovery';
          actionTarget = 'recovery';
        } else {
          replyText = 'Airport transfer is confirmed for 15:10 pickup at CDG Terminal 2E.';
        }
      } else if (lower.includes('dinner') || lower.includes('food') || lower.includes('restaurant')) {
        replyText =
          'Dinner at Le Bistro Paris remains completely unaffected! Your 21:00 table reservation is 100% safe and within walking distance of Hotel Le Grand.';
      } else if (lower.includes('hotel') || lower.includes('check-in')) {
        if (isRecovered) {
          replyText =
            'Hotel Le Grand has been notified of your 17:45 arrival. Your room is held with zero cancellation penalty.';
        } else {
          replyText =
            'Hotel Le Grand check-in was originally 16:00. With current flight delay, your arrival will be ~17:45. Automated courtesy notice is queued.';
        }
      } else {
        replyText = `Based on your live itinerary, your Mumbai → Paris journey currently has ${
          isRecovered ? 'all bookings recovered' : '1 active disruption and 3 downstream bookings at risk'
        }. You can view the dependency graph or compare recovery plans anytime.`;
        actionLabel = 'Review Recovery Plans';
        actionTarget = 'recovery';
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        actionLabel,
        actionTarget,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const sampleQuestions = [
    'Can I still make my city tour?',
    'What happened to my airport transfer?',
    'Is dinner at 21:00 affected?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">TripRescue AI Assistant</h2>
              <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected to live trip state
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-700 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
                }`}
              >
                <p>{m.text}</p>
                {m.actionLabel && (
                  <button
                    onClick={() => {
                      if (m.actionTarget) setActiveTab(m.actionTarget);
                      setIsAssistantOpen(false);
                    }}
                    className="mt-2.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <span>{m.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Sample Queries */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Suggested queries:</span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] bg-white hover:bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 text-slate-700 text-left transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about your trip or disruptions..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
