#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum PollError {
    InvalidOption = 1,
}

#[contract]
pub struct SorobanPollContract;

#[contractimpl]
impl SorobanPollContract {
    // Anket başlatma fonksiyonu
    pub fn create_poll(env: Env, question: Symbol, options: Vec<Symbol>) {
        env.storage().instance().set(&symbol_short!("question"), &question);
        env.storage().instance().set(&symbol_short!("options"), &options);
        
        // Event: Anket oluşturuldu bildirimini fırlatır
        env.events().publish((symbol_short!("poll"), symbol_short!("created")), question);
    }

    // Oy kullanma fonksiyonu (Advanced Logic + Real-time Event)
    pub fn cast_vote(env: Env, voter: Symbol, option_index: u32) -> Result<(), PollError> {
        let options: Vec<Symbol> = env.storage().instance().get(&symbol_short!("options")).unwrap();
        if option_index >= options.len() {
            return Err(PollError::InvalidOption);
        }

        let vote_key = (symbol_short!("vote"), option_index);
        let mut current_votes: u32 = env.storage().instance().get(&vote_key).unwrap_or(0);
        current_votes += 1;
        env.storage().instance().set(&vote_key, &current_votes);

        // KRİTİK: Videoda istenen gerçek zamanlı Event fırlatma yapısı
        env.events().publish(
            (symbol_short!("poll"), symbol_short!("voted")),
            (voter, option_index, current_votes)
        );

        Ok(())
    }
}
