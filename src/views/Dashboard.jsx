import React, { useState } from 'react';

export default function Dashboard() {
  const [contractAddress, setContractAddress] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [parameters, setParameters] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [auditStatus, setAuditStatus] = useState("AWAITING_AUTH");
  const [gasEstimated, setGasEstimated] = useState("0.0000000");
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState("System idle. Ready for transaction telemetry payload...");

  const connectWallet = () => {
    const mockAddress = "GDRW7X23V64IXSIMULATEDANCHORACTIVE9923";
    setWalletAddress(mockAddress);
    setIsConnected(true);
    setBalance("145.50");
    setLogs("Wallet GDRW7X...E9923 connected. Keypair authenticated on Stellar Testnet.");
  };

  const runSimulation = () => {
    if (!isConnected) {
      setLogs("Error: Cannot initiate simulation. Active wallet signature required.");
      return;
    }
    if (!contractAddress) {
      setLogs("Error: Target contract address cannot be empty.");
      return;
    }

    setIsSimulating(true);
    setAuditStatus("ANALYZING");
    setLogs("Initiating Agentic AST structural analysis...");

    setTimeout(() => {
      setLogs(prev => prev + "\nParsing WASM payload... Structure matches Soroban SDK standards.");
    }, 800);

    setTimeout(() => {
      setGasEstimated("0.0142050");
      setAuditStatus("SECURE");
      setLogs(prev => prev + "\n[Success] Simulation complete. Gas optimized. AST structural similarity verified.");
      setIsSimulating(false);
    }, 2200);
  };

  return (
    <div className="w-full h-full flex flex-col text-gray-100 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b border-[#1F2937] mb-6 flex-shrink-0">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-3.5 h-3.5 bg-indigo-500 rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-lg md:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 truncate">
            SoroSim AI Workspace
          </span>
        </div>
        <button
          onClick={connectWallet}
          className="bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-xs px-4 py-2 rounded-xl font-medium transition-all duration-200 flex-shrink-0"
        >
          {isConnected ? `${walletAddress.substring(0, 5)}...${walletAddress.substring(walletAddress.length - 4)}` : "Connect Wallet"}
        </button>
      </header>

      {/* Content Area */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-0">
        
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-[#1F2937]/30 border border-[#1F2937] rounded-2xl p-5 flex flex-col justify-between min-h-0">
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Simulation Controls</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Contract Address</label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="CC..."
                  className="w-full bg-[#1F2937]/50 border border-[#374151] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Function Name</label>
                <input
                  type="text"
                  value={functionName}
                  onChange={(e) => setFunctionName(e.target.value)}
                  placeholder="e.g. initialize"
                  className="w-full bg-[#1F2937]/50 border border-[#374151] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Parameters</label>
                <input
                  type="text"
                  value={parameters}
                  onChange={(e) => setParameters(e.target.value)}
                  placeholder="e.g. {'owner': 'GD...'}"
                  className="w-full bg-[#1F2937]/50 border border-[#374151] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white"
                />
              </div>
            </div>
          </div>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl py-3 font-semibold text-xs transition-all duration-200 shadow-lg mt-6"
          >
            {isSimulating ? "Simulating..." : "Run AI Simulation"}
          </button>
        </div>

        {/* Right Status & Logs */}
        <div className="lg:col-span-7 flex flex-col space-y-4 min-h-0 h-full">
          <div className="grid grid-cols-3 gap-3 flex-shrink-0">
            <div className="bg-[#1F2937]/30 border border-[#1F2937] rounded-xl p-3 min-w-0">
              <span className="block text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-1 truncate">Security Audit</span>
              <span className={`text-xs md:text-sm font-bold truncate block ${auditStatus === 'SECURE' ? 'text-emerald-400' : auditStatus === 'ANALYZING' ? 'text-blue-400 animate-pulse' : 'text-amber-500'}`}>
                {auditStatus}
              </span>
            </div>
            <div className="bg-[#1F2937]/30 border border-[#1F2937] rounded-xl p-3 min-w-0">
              <span className="block text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-1 truncate">Est. Gas (XLM)</span>
              <span className="text-xs md:text-sm font-bold text-gray-200 truncate block">{gasEstimated}</span>
            </div>
            <div className="bg-[#1F2937]/30 border border-[#1F2937] rounded-xl p-3 min-w-0">
              <span className="block text-[9px] text-gray-400 font-semibold uppercase tracking-wider mb-1 truncate">Balance</span>
              <span className="text-xs md:text-sm font-bold text-indigo-400 truncate block">{balance} XLM</span>
            </div>
          </div>
          
          {/* Terminal Box - Artık tüm dikey boşluğu dolduracak şekilde ayarlandı (flex-grow) */}
          <div className="flex-grow bg-[#090D16] border border-[#1F2937] rounded-xl p-4 font-mono text-xs flex flex-col min-h-0">
            <div className="flex justify-between items-center pb-2 border-b border-[#1F2937] mb-3 flex-shrink-0">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Agent Terminal</span>
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80"></span>
              </div>
            </div>
            <pre className="flex-grow overflow-y-auto text-emerald-400 whitespace-pre-wrap leading-relaxed text-[11px]">
              {logs}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}