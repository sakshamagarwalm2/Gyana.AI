import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRive } from '@rive-app/react-canvas';
import { Howl } from 'howler';
import { useAuthStore } from '../stores/authStore';

const errorSound = new Howl({ src: ['https://assets.codepen.io/154874/error.mp3'] });
const successSound = new Howl({ src: ['https://assets.codepen.io/154874/success.mp3'] });

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: 'idle',
    autoplay: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      successSound.play();
      navigate('/chat');
    } else {
      errorSound.play();
      setError('ACCESS DENIED: Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90">
      <div 
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        className="w-96 p-8 bg-black/80 border-cyan-500"
      >
        <div className="h-32 mb-8">
          <RiveComponent />
        </div>
        <h2 className="text-2xl text-cyan-500 mb-6">SYSTEM LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              className="w-full bg-black/50 border-cyan-500 text-cyan-500 p-2"
              data-augmented-ui="tl-clip br-clip both"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="w-full bg-black/50 border-cyan-500 text-cyan-500 p-2"
              data-augmented-ui="tl-clip br-clip both"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            data-augmented-ui="tl-clip br-clip both"
            className="w-full py-2 bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 transition-colors"
          >
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;