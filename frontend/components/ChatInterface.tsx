// 'use client';
// import { useState, useRef, useEffect } from 'react';

// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'ai' | 'system';
// }

// export default function ChatInterface({ userId }: { userId: string }) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;
//     const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await fetch(`http://localhost:8000/api/${userId}/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await res.json();
//       setMessages(prev => [...prev, { id: Date.now() + 1, text: data.response, sender: 'ai' }]);
//     } catch {
//       setMessages(prev => [...prev, { id: Date.now() + 1, text: 'System offline. Check backend.', sender: 'system' }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-slate-900/40">
//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         {messages.length === 0 && (
//           <div className="h-full flex items-center justify-center text-slate-500 italic">
//             Start a conversation with your AI Finance Buddy...
//           </div>
//         )}
//         {messages.map((m) => (
//           <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
//               m.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
//             }`}>
//               {m.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && <div className="text-xs text-blue-400 animate-pulse">AI is thinking...</div>}
//         <div ref={bottomRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-4 bg-slate-950/50 border-t border-white/5">
//         <div className="flex gap-3">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Type your message..."
//             className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-blue-500 transition-all text-sm"
//           />
//           <button
//             onClick={handleSend}
//             className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/40"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }