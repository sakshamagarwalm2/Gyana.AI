// import React from 'react';
import { GithubIcon, LinkedinIcon, GlobeIcon } from 'lucide-react';
import logo from '../public/logo.png';


function Header() {
    return (
        <div
            data-augmented-ui="tl-clip br-clip both"
            className="flex overflow-hidden absolute top-0 z-50 justify-between items-center p-4 mt-5 w-full border-cyan-500 top bg-black/80"
        >
            <div className="flex items-center">
                {/* Replace with your logo */}
                <img src={logo} alt="Your Logo" className="mr-2 w-8 h-8" />
                <h1 className="text-xl font-extrabold text-cyan-500">HKRM</h1>
            </div>

            <div className="flex space-x-4">
                {/* Social Media Links */}
                <a href="https://github.com/sakshamagarwalm2" target="_blank" rel="noopener noreferrer">
                    <GithubIcon 
                        size={20} 
                        className="text-cyan-500 transition-colors hover:text-white" 
                    />
                </a>
                <a href="https://www.linkedin.com/in/sakshamagarwalm2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BD0LOn0nFQNWCDHQQwOLEKA%3D%3D" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon 
                        size={20} 
                        className="text-cyan-500 transition-colors hover:text-white" 
                    />
                </a>
                <a href="https://mylook-saksham.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <GlobeIcon 
                        size={20} 
                        className="text-cyan-500 transition-colors hover:text-white" 
                    />
                </a>
            </div>
        </div>
    );
};

export default Header;