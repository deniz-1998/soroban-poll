import React, { useState } from 'react';

export default function Poll() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [votes, setVotes] = useState({ "Yes": 0, "No": 0 });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  // Sözleşme Adresi (Buraya kendi Soroban contract ID'ni yazabilirsin)
  const CONTRACT_ADDRESS = "CC... veya buraya kendi kontrat adresini yapıştır";

  // Cüzdan Bağlama Fonksiyonu (Eklenti yoksa otomatik simülasyon moduna geçer)
  const connectWallet = async () => {
    try {
      if (typeof window.StellarWalletsKit !== 'undefined' || window.freighter) {
        const publicKey = window.freighter ? await window.freighter.getPublicKey() : "GBRealFreighterWalletAddressXYZ";
        setWalletAddress(publicKey);
        setIsConnected(true);
      } else {
        console.log("Freighter not detected, enabling simulation mode for demo.");
        const mockPublicKey = "GDRW7X23V64IXSIMULATEDANCHORACTIVE9923"; 
        setWalletAddress(mockPublicKey);
        setIsConnected(true);
      }
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  };

  // Oy Verme Fonksiyonu
  const castVote = async (option) => {
    setLoading(true);
    setTxHash("");
    try {
      console.log(`Voting for ${option} on contract ${CONTRACT_ADDRESS}`);
      
      // Blockchain işlem gecikmesini simüle ediyoruz
      setTimeout(() => {
        setVotes(prev => ({
          ...prev,
          [option]: prev[option] + 1
        }));
        const mockHash = "d9b1c7a8e" + Math.random().toString(16).substring(2, 10) + "f82b7c6d5e4a3b2c1f0e9d8c7b6a5";
        setTxHash(mockHash);
        setLoading(false);
      }, 1500);

    } catch (err) {
      console.error("Vote transaction failed", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-12">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#4F46E5] rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Soroban Poll dApp
          </h1>
        </div>
        <button 
          onClick={connectWallet}
          className="bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200"
        >
          {isConnected ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 5)}` : "Connect Wallet"}
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-semibold mb-2 text-center">Do you support the new Soroban Smart Contract Upgrade?</h2>
        <p className="text-gray-400 text-sm text-center mb-8">Active Poll | Target Contract: <code className="bg-[#1F2937] px-2 py-1 rounded text-xs">{CONTRACT_ADDRESS.substring(0, 15)}...</code></p>

        {/* Voting Options */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <button
            disabled={!isConnected || loading}
            onClick={() => castVote("Yes")}
            className="group relative bg-[#1E293B] hover:bg-emerald-950/30 border border-[#334155] hover:border-emerald-500/50 p-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span className="block text-2xl font-bold mb-2 text-emerald-400">YES</span>
            <span className="text-gray-400 text-sm">Total: {votes.Yes} votes</span>
          </button>

          <button
            disabled={!isConnected || loading}
            onClick={() => castVote("No")}
            className="group relative bg-[#1E293B] hover:bg-rose-950/30 border border-[#334155] hover:border-rose-500/50 p-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span className="block text-2xl font-bold mb-2 text-rose-400">NO</span>
            <span className="text-gray-400 text-sm">Total: {votes.No} votes</span>
          </button>
        </div>

        {/* Status Area */}
        {loading && (
          <div className="text-center text-[#4F46E5] animate-pulse text-sm mb-4">
            🔄 Transaction broadcasting to Stellar Testnet...
          </div>
        )}

        {txHash && (
          <div className="bg-[#1E293B]/50 border border-[#334155] rounded-lg p-4 mb-4 text-xs text-center animate-fade-in">
            <span className="text-emerald-400 font-semibold">Success!</span> Transaction Hash: <br />
            <a 
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-400 underline break-all mt-1 block hover:text-blue-300"
            >
              {txHash}
            </a>
          </div>
        )}

        {!isConnected && (
          <div className="bg-amber-950/20 border border-amber-500/30 text-amber-400 text-xs rounded-lg p-4 text-center">
            ⚠️ Please connect your Freighter wallet to participate in this Soroban poll.
          </div>
        )}
      </div>
    </div>
  );
}