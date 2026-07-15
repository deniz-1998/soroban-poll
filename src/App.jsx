import React from 'react';
import Dashboard from './views/Dashboard';
import Poll from './views/Poll';

function App() {
  return (
    <div className="bg-[#0B0F19] min-h-screen w-full p-4 md:p-8 flex items-center justify-center">
      {/* 2 Sütunlu Eşit Yükseklikte (items-stretch) Sürükleyici Düzen */}
      <div className="max-w-[1700px] w-full mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
        
        {/* Sol Sütun: SoroSim AI Workspace */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
          <Dashboard />
        </div>

        {/* Sağ Sütun: Soroban Poll dApp */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
          <Poll />
        </div>

      </div>
    </div>
  );
}

export default App;