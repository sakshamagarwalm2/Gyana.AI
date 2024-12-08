import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Howl } from 'howler';
// import { useRive } from '@rive-app/react-canvas';
import { Animator } from '@arwes/react';
import { GridLines } from '@arwes/react-bgs';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import { useAuthStore } from './stores/authStore';
import BG_IMG from './public/pixelcut-export.png';

// import Header from './components/header';

// UI Sound Effects
const uiSounds = {
  hover: new Howl({ src: ['https://assets.codepen.io/154874/hover.mp3'] }),
  click: new Howl({ src: ['https://assets.codepen.io/154874/click.mp3'] }),
  startup: new Howl({ src: ['https://assets.codepen.io/154874/startup.mp3'] })
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    // Play startup sound
    uiSounds.startup.play();

    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div data-augmented-ui="tl-clip tr-clip br-clip bl-clip both" className="p-8 bg-black border-cyan-500">
          <h1 className="text-2xl text-cyan-500">SYSTEM INITIALIZING...</h1>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="overflow-hidden min-h-screen bg-black" style={{
        backgroundImage: `url(${BG_IMG})`, backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <GridLines
          lineColor="rgba(0, 255, 255, 0.1)"
          lineWidth={2}
          className="fixed z-10"
        />
        
        <Animator>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/chat"
              element={
                isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Animator>
      </div>
    </Router>
  );
}

export default App;