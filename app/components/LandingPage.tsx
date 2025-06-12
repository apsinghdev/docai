"use client";

import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 relative overflow-hidden flex items-center justify-center">
      {/* Sophisticated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/40 to-purple-500/30 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-gradient-to-tl from-indigo-400/35 to-purple-400/40 rounded-full blur-2xl animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-purple-300/30 to-indigo-300/35 rounded-full blur-xl animate-pulse opacity-50" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Glass Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-lg animate-float opacity-80"></div>
      <div className="absolute bottom-40 right-32 w-20 h-20 bg-purple-100/40 backdrop-blur-md rounded-2xl border border-purple-200/50 shadow-lg animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-16 w-16 h-16 bg-white/25 backdrop-blur-md rounded-full border border-white/30 shadow-lg animate-float opacity-75" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-indigo-100/35 backdrop-blur-md rounded-xl border border-indigo-200/40 shadow-lg animate-float opacity-65" style={{ animationDelay: '3s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
        {/* Refined Logo */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-white font-light text-2xl tracking-wide">AI</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-light bg-gradient-to-r from-gray-800 via-purple-700 to-indigo-800 bg-clip-text text-transparent mb-6 tracking-tight">
            DocAI
          </h1>
          
          <p className="text-gray-700 text-xl leading-relaxed font-light max-w-lg mx-auto tracking-wide">
            Transform your documents with intelligent AI assistance
          </p>
        </div>

        {/* Sophisticated Start Button */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-16 py-5 text-lg font-medium text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-2xl shadow-[0_10px_30px_-5px_rgba(139,69,244,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(139,69,244,0.4)] transform hover:scale-[1.02] transition-all duration-500 border border-purple-500/20"
        >
          <span className="relative z-10 tracking-wide">Get Started</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg); 
            }
            25% { 
              transform: translateY(-15px) translateX(5px) rotate(1deg); 
            }
            50% { 
              transform: translateY(-8px) translateX(-3px) rotate(-0.5deg); 
            }
            75% { 
              transform: translateY(5px) translateX(2px) rotate(0.5deg); 
            }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default LandingPage;