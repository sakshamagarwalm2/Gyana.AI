import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GLOBE from 'vanta/dist/vanta.globe.min';
import { Howl } from 'howler';

const hoverSound = new Howl({ src: ['https://assets.codepen.io/154874/hover.mp3'] });

function HomePage() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (vantaRef.current) {
      vantaEffect.current = GLOBE({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00ffff,
        backgroundColor: 0x000000
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="min-h-screen flex flex-col items-center justify-center">
      <div 
        data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
        className="p-12 bg-black/80 border-cyan-500 text-center"
      >
        <h1 className="text-5xl font-bold text-cyan-500 mb-8">NEURAL LINK</h1>
        <p className="text-cyan-300 mb-8">Advanced AI Communication Interface</p>
        <div className="space-x-4">
          <Link
            to="/login"
            onMouseEnter={() => hoverSound.play()}
            data-augmented-ui="tl-clip br-clip both"
            className="inline-block px-8 py-3 bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 transition-colors"
          >
            ACCESS TERMINAL
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;