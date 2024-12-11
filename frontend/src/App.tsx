import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Howl } from "howler";
// import { useRive } from '@rive-app/react-canvas';
import { Animator } from "@arwes/react";
import { GridLines } from "@arwes/react-bgs";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { useAuthStore } from "./stores/authStore";
import BG_IMG from "./public/pixelcut-export.png";
import clsound from './public/mixkit-sci-fi-click-900.wav';
import hvsound from './public/mixkit-sci-fi-confirmation-914.wav';
import entsound from './public/mixkit-apocalyptic-stomp-impact-3057.wav';

// import Header from './components/header';

// UI Sound Effects
const uiSounds = {
  hover: new Howl({ src: [hvsound] }),
  click: new Howl({ src: [clsound] }),
  startup: new Howl({ src: [entsound] }),
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Play startup sound
    uiSounds.hover.play();

    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
          className="p-8 bg-black border-cyan-500"
        >
          <h1 className="text-2xl text-cyan-500">SYSTEM INITIALIZING...</h1>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="overflow-hidden relative min-h-screen bg-black">
        <div
          className="z-0 h-screen w-full fixed"
          style={{
            backgroundImage: `url(${BG_IMG})`,
            backgroundSize: "cover",
          }}
        >
          <GridLines
            lineColor="rgba(0, 255, 255, 0.1)"
            lineWidth={2}
            className="fixed"
          />
        </div>

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
