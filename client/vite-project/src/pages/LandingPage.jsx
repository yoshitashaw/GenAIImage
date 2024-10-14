import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import custom CSS for the stars or background
import glowingImage from '../assets/background.png';

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      {/* Background gradient and starry effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-black opacity-90 z-0"></div>

      <div className="absolute inset-0 z-0 starry-background"></div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-6 bouncy-text">
          Visualize your own imagination
        </h1>
        <p className="mb-12 text-lg font-medium bouncy-text ">
          Bring life to your creative mind and give a visual look to what you think.<br />
          Click the button to explore!!
        </p>
        
        {/* Button section */}
        <div className="space-x-6">
          {/* Link to Home Page */}
          <Link to="/home">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-lg font-bold">
              COMMUNITY SHOWCASE
            </button>
          </Link>

          {/* Link to CreatePost Page */}
          <Link to="/create-post">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-lg font-bold">
              CREATE IMAGE
            </button>
          </Link>
        </div>
      </div>

      {/* Image with shadow at the bottom */}
      <div className="absolute bottom-0 w-full flex justify-center mb-10"> {/* Adjust margin as needed */}
        <img src={glowingImage} alt="Glow" className="shadow-image" />
      </div>
    </div>
  );
}

export default LandingPage;
