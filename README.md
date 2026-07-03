# 🗳️ Soroban Poll Smart Contract & dApp (Level 3)

A production-ready, end-to-end decentralized voting application built on the Stellar network using Soroban smart contracts. This project features advanced contract logic, real-time event streaming, comprehensive unit testing, and a mobile-responsive frontend.

---

##  Submission Links & Details

-- **Live Demo Link:** https://sorosim-ai.vercel.app
- **Demo Video Link:** https://youtu.be/QX6GqxaBPx0
- **Contract Deployment Address:** `CC...STELLAR...CONTRACT...ADDRESS...` *(Update with your deployed Testnet contract ID)*
- **Transaction Hash:** `0x...TRANSACTION...HASH...` *(Update with your transaction hash)*

---

## 📝 Key Features & Requirements Met

* **Advanced Smart Contract Logic:** Built with Rust and Soroban SDK, featuring structured error handling via `PollError` enums.
* **Event Streaming & Real-Time Updates:** Emits real-time cryptographic events (`poll created` and `poll voted`) using `env.events().publish()` for frontend indexing.
* **Automated CI/CD Pipeline:** Fully configured GitHub Actions workflow (`ci.yml`) to automatically trigger on pushes, pulling down the stable Rust toolchain and verifying contract integrity via `cargo test`.
* **Mobile Responsive Frontend:** Integrated with Tailwind CSS and Stellar Freighter API for seamless Web3 wallet connections across all viewports.
* **Robust Test Suite:** Features 3+ passing unit tests covering edge cases, invalid options, and successful state mutations.

---

## 🛠️ Local Setup & Execution

### 1. Smart Contract Verification
```bash
cd contracts/soroban-poll-contract
cargo test
