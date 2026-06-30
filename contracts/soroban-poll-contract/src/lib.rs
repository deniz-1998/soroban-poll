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
    /// Yeni bir anket başlatır ve storage üzerine yazar.
    pub fn create_poll(env: Env, question: Symbol, options: Vec<Symbol>) {
        env.storage().instance().set(&symbol_short!("question"), &question);
        env.storage().instance().set(&symbol_short!("options"), &options);
        
        // Event: Anket başarıyla oluşturuldu bildirimi
        env.events().publish(
            (symbol_short!("poll"), symbol_short!("created")), 
            question
        );
    }

    /// Belirtilen seçenek indeksine oy verir. Gelişmiş hata yönetimi ve event akışı içerir.
    pub fn cast_vote(env: Env, voter: Symbol, option_index: u32) -> Result<(), PollError> {
        // Seçenekleri güvenli bir şekilde storage'dan çekiyoruz
        let options_key = symbol_short!("options");
        if !env.storage().instance().has(&options_key) {
            return Err(PollError::InvalidOption);
        }
        
        let options: Vec<Symbol> = env.storage().instance().get(&options_key).unwrap();
        
        // Sınır kontrolü (Hata Yönetimi)
        if option_index >= options.len() {
            return Err(PollError::InvalidOption);
        }

        // Dinamik oy anahtarı oluşturma ve güncelleme
        let vote_key = (symbol_short!("vote"), option_index);
        let mut current_votes: u32 = env.storage().instance().get(&vote_key).unwrap_or(0);
        current_votes += 1;
        env.storage().instance().set(&vote_key, &current_votes);

        // Gerçek zamanlı Event fırlatma yapısı (Frontend indexer'ları için)
        env.events().publish(
            (symbol_short!("poll"), symbol_short!("voted")),
            (voter, option_index, current_votes)
        );

        Ok(())
    }
}
