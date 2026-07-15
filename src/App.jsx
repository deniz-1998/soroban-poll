import React from 'react';
import Dashboard from './views/Dashboard';
import Poll from './views/Poll';

function App() {
  return (
    <div className="bg-[#0B0F19] min-h-screen xl:h-screen w-full p-4 md:p-6 flex flex-col justify-stretch">
      {/* Sayfayı Tam Kaplayan (flex-grow) 2 Sütunlu Dev Düzen */}
      <div className="w-full h-full flex-grow grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-stretch">
        
        {/* Sol Sütun: SoroSim AI Workspace */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between h-full min-h-0">
          <Dashboard />
        </div>

        {/* Sağ Sütun: Soroban Poll dApp */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between h-full min-h-0">
          <Poll />
        </div>

      </div>
    </div>
  );
}

export default App;