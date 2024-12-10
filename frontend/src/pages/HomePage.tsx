import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import GLOBE from "vanta/dist/vanta.globe.min";
import { Howl } from "howler";
import Header from "../components/header";
import clsound from "../public/mixkit-sci-fi-click-900.wav";

const hoverSound = new Howl({ src: [clsound] });

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
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 0.7,
        color: 0x00ffff,
        backgroundColor: 0x0,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div className="h-full w-full">
      <Header />
      {/* Globe Background */}
      <div ref={vantaRef} className="w-full h-full fixed inset-0" />

      {/* Content Overlay */}
      <div className="flex  z-50 flex-col mt-28 md:mt-0 justify-center items-center w-full h-full md:h-screen">
        <div className="md:flex-row flex-col w-full h-full flex justify-center items-center">
          <div
            data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
            className="p-5 m-5 text-center border-cyan-500 md:p-12 bg-black/80"
          >
            <h1 className="mb-8 w-full text-3xl font-bold text-cyan-500 md:text-5xl">
              Gyana.AI_
            </h1>
            <p className="mb-8 w-full font-light text-cyan-300">
              Advanced AI Communication With hkrm_
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                onMouseEnter={() => hoverSound.play()}
                data-augmented-ui="tl-clip br-clip both"
                className="inline-block font-semibold px-8 py-3 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
              >
                ACCESS TERMINAL AI_
              </Link>
            </div>
          </div>
          <div
            data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
            className="p-5 m-5 text-center border-cyan-500 md:p-12 bg-black/80"
          >
            <h1 className="mb-8 w-full text-xl font-semibold text-cyan-500 md:text-5xl">
              Author look_
            </h1>
            <p className="mb-8 w-full font-light text-cyan-300">
              Author_ Saksham Agarwal, a software developer passionate about AI,
              machine learning, and web development. With a keen interest in
              quantum computing and research, I strive to create innovative
              solutions that make a meaningful impact. "True wealth lies in
              knowledge—it holds the power to transform the world."
            </p>
            <div className="w-full flex justify-center items-center gap-5 flex-col md:flex-row">
            <div className="space-x-4">
              <a
                href="https://mylook-saksham.vercel.app/"
                target="_blank"
                onMouseEnter={() => hoverSound.play()}
                data-augmented-ui="tl-clip br-clip both"
                className="inline-block font-semibold px-8 py-3 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
              >
                Authors look_
              </a>
            </div>
            <div className="space-x-4">
              <a
                href="https://mylook-saksham.vercel.app/"
                target="_blank"
                onMouseEnter={() => hoverSound.play()}
                data-augmented-ui="tl-clip br-clip both"
                className="inline-block font-semibold px-8 py-3 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"
              >
                DOC_
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
