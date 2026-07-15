import React from 'react';
import Dashboard from './views/Dashboard';
import Poll from './views/Poll';

function App() {
  return (
    <div className="bg-[#0B0F19] min-h-screen">
      {/* 1. EKRAN: SoroSim AI Workspace */}
      <div className="border-b border-[#1F2937] pb-12">
        <Dashboard />
      </div>

      {/* Görsel bir ayırıcı çizgi ve başlık */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-dashed border-[#1F2937]"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500 uppercase tracking-widest bg-[#0B0F19] px-4 py-1 border border-[#1F2937] rounded-full">
            Live Voting Integration Area
          </span>
          <div className="flex-grow border-t border-dashed border-[#1F2937]"></div>
        </div>
      </div>

      {/* 2. EKRAN: Soroban Poll dApp */}
      <div className="pb-16">
        <Poll />
      </div>
    </div>
  );
}

export default App;