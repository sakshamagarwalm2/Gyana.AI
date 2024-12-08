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
        scaleMobile: 0.70,         
        color: 0x00ffff,         
        backgroundColor: 0x0       
      });     
    }      

    return () => {       
      if (vantaEffect.current) vantaEffect.current.destroy();     
    };   
  }, []);    

  return (
    <div className="relative p-5 min-h-screen md:p-10">
      {/* Globe Background */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0" 
      />
      
      {/* Content Overlay */}
      <div className="flex relative z-50 flex-col justify-center items-center min-h-screen">
        <div          
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"         
          className="p-12 text-center border-cyan-500 bg-black/80"       
        >
          <h1 className="mb-8 text-5xl font-bold text-cyan-500">Gyana.AI</h1>
          <p className="mb-8 text-cyan-300">Advanced AI Communication Interface</p>
          <div className="space-x-4">
            <Link             
              to="/login"             
              onMouseEnter={() => hoverSound.play()}             
              data-augmented-ui="tl-clip br-clip both"             
              className="inline-block px-8 py-3 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"           
            >
              ACCESS TERMINAL
            </Link>
          </div>
        </div>
      </div>
    </div>
  ); 
}  

export default HomePage;