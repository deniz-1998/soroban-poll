#![no_std]
use soroban_sdk::{contract, contractimpl, contracterror, symbol_short, Env, Symbol, Vec};

#[contracterror]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum PollError {
    InvalidOption = 1,
}

#[contract]
pub struct SorobanPollContract;

#[contractimpl]
impl SorobanPollContract {
    pub fn create_poll(env: Env, question: Symbol, options: Vec<Symbol>) {
        env.storage().instance().set(&symbol_short!("question"), &question);
        env.storage().instance().set(&symbol_short!("options"), &options);
        
        env.events().publish(
            (symbol_short!("poll"), symbol_short!("created")), 
            question
        );
    }

    pub fn cast_vote(env: Env, voter: Symbol, option_index: u32) {
        let options_key = symbol_short!("options");
        if !env.storage().instance().has(&options_key) {
            panic!("Poll options not initialized");
        }
        
        let options: Vec<Symbol> = env.storage().instance().get(&options_key).unwrap();
        
        if option_index >= options.len() {
            panic!("Invalid option index");
        }

        let vote_key = (symbol_short!("vote"), option_index);
        let mut current_votes: u32 = env.storage().instance().get(&vote_key).unwrap_or(0);
        current_votes += 1;
        env.storage().instance().set(&vote_key, &current_votes);

        env.events().publish(
            (symbol_short!("poll"), symbol_short!("voted")),
            (voter, option_index, current_votes)
        );
    }
}
