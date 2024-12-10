import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import { useAuthStore } from '../stores/authStore';
import { Trash2, Send, LogOut } from 'lucide-react';
import { api } from '../services/api';
import { DEFAULT_MESSAGES, getErrorMessage } from '../utils/errorMessages';

const messageSound = new Howl({ src: ['https://assets.codepen.io/154874/message.mp3'] });
const errorSound = new Howl({ src: ['https://assets.codepen.io/154874/error.mp3'] });

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  //@ts-ignore
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { userId, logout } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(scrollToBottom, [messages]);

  const loadChatHistory = async () => {
    console.log("localhist: ",userId)
    if (!userId) return;
    
    try {
      const response = await api.getChatHistory(userId);
      console.log(response);
      if (response.success) {
        setMessages(response.history.map((msg: any, index: number) => ({
          id: index,
          text: msg.text,
          sender: msg.sender
        })));
      }
    } catch (error) {
      errorSound.play();
      const userMessage: Message = {
        id: Date.now(),
        text: DEFAULT_MESSAGES.CHAT_HISTORY_ERROR,
        sender: 'ai'
      };
      setMessages([userMessage]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userId) return;
    // console.log(userId);

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };

    console.log(userMessage, userMessage.id, userMessage.text, userMessage.sender);

    setMessages(prev => [...prev, userMessage]);

    setInput('');
    messageSound.play();
    setIsLoading(true);

    try {
      // console.log(setMessages, userId, input);
      const response = await api.sendMessage(userId, input);
      // console.log("chatpg: ",response)
      // console.log("chatpg: ",response.chats.slice(-1)[0].content)

      if (response) {
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: response.chats.slice(-1)[0].content,
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiMessage]);
        messageSound.play();
      } else {
        throw new Error(response.error || DEFAULT_MESSAGES.AI_ERROR);
      }
    } catch (error) {
      errorSound.play();
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: getErrorMessage(error),
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    if (!userId) return;

    try {
      const response = await api.clearChatHistory(userId);
      if (response.success) {
        setMessages([]);
        messageSound.play();
      } else {
        throw new Error(DEFAULT_MESSAGES.CLEAR_HISTORY_ERROR);
      }
    } catch (error) {
      errorSound.play();
      const errorMessage: Message = {
        id: Date.now(),
        text: getErrorMessage(error),
        sender: 'ai'
      };
      setMessages([errorMessage]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
    
  return (
    <div className="flex relative z-30 flex-col p-5 min-h-screen md:p-10 bg-black/20">
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
            className="p-3 text-red-500 transition-colors bg-red-500/20 hover:bg-red-500/30"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={handleLogout}
            data-augmented-ui="tl-clip br-clip both"
            className="p-3 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
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
            className="flex-1 p-4 text-cyan-500 border-cyan-500 bg-black/50"
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