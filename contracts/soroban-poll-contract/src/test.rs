#![cfg(test)]
use super::*;
use soroban_sdk::{Env, Vec, Symbol, symbol_short};

#[test]
fn test_create_poll_success() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanPollContract);
    let client = SorobanPollContractClient::new(&env, &contract_id);

    let question = symbol_short!("question");
    let mut options = Vec::new(&env);
    options.push_back(symbol_short!("yes"));
    options.push_back(symbol_short!("no"));

    client.create_poll(&question, &options);
}

#[test]
fn test_cast_vote_success() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanPollContract);
    let client = SorobanPollContractClient::new(&env, &contract_id);

    let question = symbol_short!("question");
    let mut options = Vec::new(&env);
    options.push_back(symbol_short!("yes"));

    client.create_poll(&question, &options);

    let voter = symbol_short!("voter1");
    let result = client.cast_vote(&voter, &0);
    assert!(result.is_ok());
}

#[test]
fn test_cast_vote_invalid_option_error() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanPollContract);
    let client = SorobanPollContractClient::new(&env, &contract_id);

    let question = symbol_short!("question");
    let mut options = Vec::new(&env);
    options.push_back(symbol_short!("yes"));

    client.create_poll(&question, &options);

    let voter = symbol_short!("voter1");
    let result = client.cast_vote(&voter, &5); // 5 is an invalid index
    
    assert!(result.is_err());
}
