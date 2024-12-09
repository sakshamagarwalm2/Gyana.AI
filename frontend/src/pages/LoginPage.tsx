import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRive } from '@rive-app/react-canvas';
import { Howl } from 'howler';
import { useAuthStore } from '../stores/authStore';
import { Mail, Lock, User, Loader } from 'lucide-react';

const errorSound = new Howl({ src: ['https://assets.codepen.io/154874/error.mp3'] });
const successSound = new Howl({ src: ['https://assets.codepen.io/154874/success.mp3'] });

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: 'idle',
    autoplay: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Name is required');
          errorSound.play();
          return;
        }
        success = await register(name, email, password);
      }

      if (success) {
        successSound.play();
        navigate('/chat');
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
        errorSound.play();
      }
    } catch (err) {
      setError('System malfunction. Please try again.');
      errorSound.play();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute z-40 min-h-screen w-full flex items-center justify-center bg-black/20">
      <div 
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        className="w-96 p-8 bg-black/80 border-cyan-500"
      >
        <div className="h-32 mb-8">
          <RiveComponent />
        </div>
        <h2 className="text-2xl text-cyan-500 mb-6">
          {isLogin ? 'SYSTEM LOGIN' : 'SYSTEM REGISTRATION'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="NAME"
                  className="w-full bg-black/50 border-cyan-500 text-cyan-500 p-2 pl-10"
                  data-augmented-ui="tl-clip br-clip both"
                />
                <User className="absolute left-3 top-2.5 text-cyan-500" size={16} />
              </div>
            </div>
          )}
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
                className="w-full bg-black/50 border-cyan-500 text-cyan-500 p-2 pl-10"
                data-augmented-ui="tl-clip br-clip both"
              />
              <Mail className="absolute left-3 top-2.5 text-cyan-500" size={16} />
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                className="w-full bg-black/50 border-cyan-500 text-cyan-500 p-2 pl-10"
                data-augmented-ui="tl-clip br-clip both"
              />
              <Lock className="absolute left-3 top-2.5 text-cyan-500" size={16} />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            data-augmented-ui="tl-clip br-clip both"
            className="w-full py-2 bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={16} />
                <span>PROCESSING</span>
              </>
            ) : (
              <span>{isLogin ? 'AUTHENTICATE' : 'REGISTER'}</span>
            )}
          </button>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-500 hover:text-cyan-400 text-sm"
            >
              {isLogin ? 'Need access? Register here' : 'Already registered? Login here'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;