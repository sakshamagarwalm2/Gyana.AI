import { useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom'; 
//@ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min'; 
import { Howl } from 'howler';  
import Header from '../components/header';

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
    <div className="overflow-hidden relative h-screen"> 
    <Header/>
      {/* Globe Background */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0" 
      />
      
      {/* Content Overlay */}
      <div className="flex relative z-30 flex-col justify-center items-center w-full h-full"> 
        <div          
          data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"         
          className="p-5 m-5 text-center border-cyan-500 md:p-12 bg-black/80"       
        >
          <h1 className="mb-8 w-full text-3xl font-bold text-cyan-500 md:text-5xl">Gyana.AI</h1>
          <p className="mb-8 w-full font-light text-cyan-300">Advanced AI Communication With hkrm</p>
          <div className="space-x-4">
            <Link             
              to="/login"             
              onMouseEnter={() => hoverSound.play()}             
              data-augmented-ui="tl-clip br-clip both"             
              className="inline-block px-8 py-3 text-cyan-500 transition-colors bg-cyan-500/20 hover:bg-cyan-500/30"           
            >
              ACCESS TERMINAL AI_
            </Link>
          </div>
        </div>
      </div>
    </div>
  ); 
}  

export default HomePage;