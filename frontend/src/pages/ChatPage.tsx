import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import { useAuthStore } from '../stores/authStore';
import { Trash2, Send, LogOut } from 'lucide-react';
import { api } from '../services/api';
import { DEFAULT_MESSAGES, getErrorMessage } from '../utils/errorMessages';
import logo from '../public/logo.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsound from '../public/mixkit-sci-fi-click-900.wav';
import hvsound from '../public/mixkit-sci-fi-confirmation-914.wav';

const messageSound = new Howl({ src: [clsound] });
const errorSound = new Howl({ src: [hvsound] });

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai' | 'system';
  systemType?: 'error' | 'info' | 'warning';
}

interface ChatPageProps {
  systemMessageFormatter?: (message: string, type?: 'error' | 'info' | 'warning') => string;
}

function ChatPage({ 
  systemMessageFormatter = (msg, type) => {
    // Default system message formatter
    const prefix = type ? `[${type.toUpperCase()}] ` : '';
    return `${prefix}${msg}`;
  }
}: ChatPageProps) {
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
    if (!userId) return;
  
    try {
      const response = await api.getChatHistory(userId);
      
      if (response.chats && response.chats.length > 0) {
        const historicalMessages: Message[] = response.chats.map((chat: any, index: number) => ({
          id: index,
          text: chat.content,
          sender: chat.sender || (index % 2 === 0 ? 'user' : 'ai')
        }));
  
        setMessages(historicalMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      errorSound.play();
      const userMessage: Message = {
        id: Date.now(),
        text: systemMessageFormatter(DEFAULT_MESSAGES.CHAT_HISTORY_ERROR, 'error'),
        sender: 'system',
        systemType: 'error'
      };
      setMessages([userMessage]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userId) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);

    setInput('');
    messageSound.play();
    setIsLoading(true);

    try {
      const response = await api.sendMessage(userId, input);

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
        text: systemMessageFormatter(getErrorMessage(error), 'error'),
        sender: 'system',
        systemType: 'error'
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
      if (response) {
        setMessages([]);
        messageSound.play();
      } else {
        throw new Error(DEFAULT_MESSAGES.CLEAR_HISTORY_ERROR);
      }
    } catch (error) {
      errorSound.play();
      const errorMessage: Message = {
        id: Date.now(),
        text: systemMessageFormatter(getErrorMessage(error), 'error'),
        sender: 'system',
        systemType: 'error'
      };
      setMessages([errorMessage]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderMessageContent = (message: Message) => {
    // Render different styles based on sender
    switch (message.sender) {
      case 'user':
        return message.text;
      case 'ai':
        return (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom styling for different markdown elements
              strong: ({node, ...props}) => (
                <strong className="font-bold text-purple-300" {...props} />
              ),
              em: ({node, ...props}) => (
                <em className="italic text-purple-200" {...props} />
              ),
              h1: ({node, ...props}) => (
                <h1 className="text-xl font-bold text-purple-400 mb-2" {...props} />
              ),
              h2: ({node, ...props}) => (
                <h2 className="text-lg font-semibold text-purple-300 mb-1" {...props} />
              ),
              code: ({node, ...props}) => (
                <code className="bg-purple-800/30 text-purple-200 p-1 rounded" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-5 mb-2" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal pl-5 mb-2" {...props} />
              )
            }}
          >
            {message.text}
          </ReactMarkdown>
        );
      case 'system':
        return (
          <div 
            className={`
              ${message.systemType === 'error' ? 'text-red-400' : 
                message.systemType === 'warning' ? 'text-yellow-400' : 'text-cyan-400'}
            `}
          >
            {message.text}
          </div>
        );
      default:
        return message.text;
    }
  };
    
  return (
    <div className="flex z-30 flex-col min-h-screen md:p-10 bg-black/90">
      {/* Header */}
      <div
        data-augmented-ui="tl-clip br-clip both"
        className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-4 border-cyan-500 bg-black/80"
      >
        <div className='flex gap-2'>
        <img src={logo} alt="Your Logo" className="mr-2 w-8 h-8" />
        <h1 className="text-xl font-extrabold text-cyan-500">Gyana.AI</h1>

        </div>
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
      <div className="overflow-y-auto flex-1 p-4 space-y-4 mt-16">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 
              message.sender === 'system' ? 'justify-center' : 
              'justify-start'
            }`}
          >
            <div
              data-augmented-ui="tl-clip br-clip both"
              className={`max-w-[80%] p-3 ${
                message.sender === 'user'
                  ? 'bg-cyan-700/20 text-cyan-400 font-semibold' :
                message.sender === 'system'
                  ? 'bg-gray-700/20 text-gray-500 ' :
                  'bg-purple-700/20 text-purple-500 font-semibold'
              }`}
            >
              {renderMessageContent(message)}
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