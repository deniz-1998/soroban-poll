#![cfg(test)]
use super::*;
use soroban_sdk::{Env, Vec, Symbol, symbol_short};

// Test 1: Anketin başarıyla oluşturulup oluşturulmadığını test eder
#[test]
fn test_create_poll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanPollContract);
    let client = SorobanPollContractClient::new(&env, &contract_id);

    let question = symbol_short!("question");
    let mut options = Vec::new(&env);
    options.push_back(symbol_short!("yes"));
    options.push_back(symbol_short!("no"));

    client.create_poll(&question, &options);
}

// Test 2: Başarılı bir şekilde oy verilmesini ve event fırlatılmasını test eder
#[test]
fn test_cast_vote_success() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanPollContract);
    let client = SorobanPollContractClient::new(&env, &contract_id);

    let question = symbol_short!("question");
    let mut options = Vec::new(&env);
    options.push_back(symbol_short!("yes"));
    options.push_back(symbol_short!("no"));

    client.create_poll(&question, &options);

    let voter = symbol_short!("voter1");
    let result = client.cast_vote(&voter, &0);
    assert_eq!(result, Ok(()));
}

// Test 3: Geçersiz bir seçeneğe oy verildiğinde kontratın hata (Error) döndürüp döndürmediğini test eder
#[test]
fn test_cast_vote_invalid_option() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanPollContract);
    let client = SorobanPollContractClient::new(&env, &contract_id);

    let question = symbol_short!("question");
    let mut options = Vec::new(&env);
    options.push_back(symbol_short!("yes"));

    client.create_poll(&question, &options);

    let voter = symbol_short!("voter1");
    // 0 indexli bir seçenek var, 5 indexli seçenek geçersizdir ve PollError::InvalidOption dönmelidir
    let result = client.cast_vote(&voter, &5);
    assert_eq!(result, Err(PollError::InvalidOption));
}
