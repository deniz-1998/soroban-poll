async function main() {
    console.log("🚀 Starting Soroban Contract Integration Test...");
  
    try {
      // Dynamic import to natively bypass the ES Module restrictions in Node/TS runtime
      const { Client } = await import('./frontend-package/dist/index.js');
  
      const client = new Client({
        networkPassphrase: 'Test SDF Network ; September 2015',
        contractId: 'CDTHKA53AIM2IB7QN5MIUOUC5RN73KB4Y6JR42XAWCEDY4ZAK3UNZ3FK',
        rpcUrl: 'https://soroban-testnet.stellar.org',
      });
  
      // 1. Initialize a new poll
      console.log("\n1️⃣ Initializing a new poll...");
      const initTx = await client.init_poll({
        question: "What is your favorite smart contract platform?",
        options: ["Stellar", "Ethereum", "Solana"]
      });
      
      await initTx.signAndSubmit();
      console.log("✅ Poll successfully created!");
  
      // 2. Cast a vote
      console.log("\n2️⃣ Casting a vote...");
      const voteTx = await client.vote({ selected_option: "Stellar" });
      await voteTx.signAndSubmit();
      console.log("✅ Vote successfully submitted!");
  
      // 3. Fetch current results
      console.log("\n3️⃣ Fetching live poll results from the network...");
      const results = await client.get_results();
      console.log("📊 Live Blockchain Results:", results);
  
    } catch (error) {
      console.error("❌ Integration error occurred:", error);
    }
  }
  
  main();