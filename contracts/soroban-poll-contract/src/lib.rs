#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, String, Vec, map, Map};

#[contract]
pub struct LivePollContract;

#[contractimpl]
impl LivePollContract {
    // Initializes the poll with a question and a list of options
    pub fn init_poll(env: Env, question: String, options: Vec<String>) {
        env.storage().instance().set(&Symbol::new(&env, "question"), &question);
        env.storage().instance().set(&Symbol::new(&env, "options"), &options);
        
        let mut votes_map: Map<String, u32> = map![&env];
        for i in 0..options.len() {
            if let Some(opt) = options.get(i) {
                votes_map.set(opt, 0);
            }
        }
        env.storage().instance().set(&Symbol::new(&env, "votes"), &votes_map);
    }

    // Casts a vote for a specific option and increments its count
    pub fn vote(env: Env, selected_option: String) -> Map<String, u32> {
        let votes_key = Symbol::new(&env, "votes");
        let mut votes_map: Map<String, u32> = env.storage().instance().get(&votes_key).unwrap_or(map![&env]);
        
        if votes_map.contains_key(selected_option.clone()) {
            let current_votes = votes_map.get(selected_option.clone()).unwrap();
            let new_votes = current_votes + 1;
            votes_map.set(selected_option.clone(), new_votes);
            env.storage().instance().set(&votes_key, &votes_map);
            
            // Real-time event publishing required for Level 2
            env.events().publish(
                (Symbol::new(&env, "POLL_UPDATED"), selected_option),
                new_votes
            );
        }
        
        votes_map
    }

    // Retrieves the current state and results of the live poll
    pub fn get_results(env: Env) -> Map<String, u32> {
        let votes_key = Symbol::new(&env, "votes");
        env.storage().instance().get(&votes_key).unwrap_or(map![&env])
    }
}
