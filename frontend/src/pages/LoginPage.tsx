import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRive } from '@rive-app/react-canvas';
import { Howl } from 'howler';
import { useAuthStore } from '../stores/authStore';

const errorSound = new Howl({ src: ['https://assets.codepen.io/154874/error.mp3'] });
const successSound = new Howl({ src: ['https://assets.codepen.io/154874/success.mp3'] });

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const register: any = useAuthStore(state => state.register);

  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: 'idle',
    autoplay: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      if (login(username, password)) {
        successSound.play();
        navigate('/chat');
      } else {
        errorSound.play();
        setError('ACCESS DENIED: Invalid credentials');
      }
    } else {
      // Sign up logic
      if (!username || !email || !password) {
        errorSound.play();
        setError('ALL FIELDS ARE REQUIRED');
        return;
      }

      if (password !== confirmPassword) {
        errorSound.play();
        setError('PASSWORDS DO NOT MATCH');
        return;
      }

      // Assuming register returns true if successful
      if (register(username, email, password)) {
        successSound.play();
        navigate('/chat');
      } else {
        errorSound.play();
        setError('REGISTRATION FAILED');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Reset form fields when switching modes
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  return (
    <div className="flex justify-center items-center p-10 min-h-screen bg-black/20">
      <div 
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        className="p-8 w-96 border-cyan-500 bg-black/80"
      >
        <div className="mb-8 h-32">
          <RiveComponent />
        </div>
        <h2 className="mb-6 text-2xl text-cyan-500">
          {isLogin ? 'SYSTEM LOGIN' : 'SYSTEM REGISTRATION'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              className="p-2 w-full text-cyan-500 border-cyan-500 bg-black/50"
              data-augmented-ui="tl-clip br-clip both"
            />
          </div>
          
          {!isLogin && (
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
                className="p-2 w-full text-cyan-500 border-cyan-500 bg-black/50"
                data-augmented-ui="tl-clip br-clip both"
              />
            </div>
          )}
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="p-2 w-full text-cyan-500 border-cyan-500 bg-black/50"
              data-augmented-ui="tl-clip br-clip both"
            />
          </div>
          
          {!isLogin && (
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="CONFIRM PASSWORD"
                className="p-2 w-full text-cyan-500 border-cyan-500 bg-black/50"
                data-augmented-ui="tl-clip br-clip both"
              />
            </div>
          )}
          
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
          
          <button
            type="submit"
            data-augmented-ui="tl-clip br-clip both"
            className="py-2 w-full text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
          >
            {isLogin ? 'AUTHENTICATE' : 'REGISTER'}
          </button>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-cyan-500 hover:underline"
            >
              {isLogin 
                ? 'Need an account? SIGN UP' 
                : 'Already have an account? LOGIN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;