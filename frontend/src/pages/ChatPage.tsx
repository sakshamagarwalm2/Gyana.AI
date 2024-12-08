import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import { useAuthStore } from '../stores/authStore';
import { Trash2, Send, LogOut } from 'lucide-react';

const messageSound = new Howl({ src: ['https://assets.codepen.io/154874/message.mp3'] });

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    messageSound.play();

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: "I am an AI assistant. How can I help you today?",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
      messageSound.play();
    }, 1000);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex relative z-50 flex-col p-5 min-h-screen md:p-10 bg-black/20">
      {/* Header */}
      <div 
        data-augmented-ui="tl-clip br-clip both"
        className="flex justify-between items-center p-4 border-cyan-500 bg-black/80"
      >
        <h1 className="text-xl text-cyan-500">Gyana.AI</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleClear}
            data-augmented-ui="tl-clip br-clip both"
            className="p-2 text-red-500 transition-colors bg-red-500/20 hover:bg-red-500/30"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={handleLogout}
            data-augmented-ui="tl-clip br-clip both"
            className="p-2 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              data-augmented-ui="tl-clip br-clip both"
              className={`max-w-[80%] p-3 ${
                message.sender === 'user'
                  ? 'bg-cyan-500/20 text-cyan-500'
                  : 'bg-purple-500/20 text-purple-500'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            className="flex-1 p-2 text-cyan-500 border-cyan-500 bg-black/50"
            data-augmented-ui="tl-clip br-clip both"
          />
          <button
            type="submit"
            data-augmented-ui="tl-clip br-clip both"
            className="p-2 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;