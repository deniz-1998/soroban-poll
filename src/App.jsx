import React from 'react';
import Dashboard from './views/Dashboard';
import Poll from './views/Poll';

function App() {
  return (
    <div className="bg-[#0B0F19] min-h-screen w-full p-4 md:p-8">
      {/* 2 Sütunlu Yan Yana Düzen (Masaüstünde yan yana, mobilde alt alta) */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        
        {/* Sol Sütun: SoroSim AI Workspace */}
        <div className="bg-[#0F172A]/40 border border-[#1F2937] rounded-3xl p-2 shadow-2xl">
          <Dashboard />
        </div>

        {/* Sağ Sütun: Soroban Poll dApp */}
        <div className="bg-[#0F172A]/40 border border-[#1F2937] rounded-3xl p-2 shadow-2xl">
          <Poll />
        </div>

      </div>
    </div>
  );
}

export default App;