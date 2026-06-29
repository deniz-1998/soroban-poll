import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDTHKA53AIM2IB7QN5MIUOUC5RN73KB4Y6JR42XAWCEDY4ZAK3UNZ3FK",
  }
} as const


export interface Client {
  /**
   * Construct and simulate a vote transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  vote: ({selected_option}: {selected_option: string}, options?: MethodOptions) => Promise<AssembledTransaction<Map<string, u32>>>

  /**
   * Construct and simulate a init_poll transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init_poll: (args: {question: string, options: Array<string>}, options?: MethodOptions) => Promise<AssembledTransaction<null>>
  /**
   * Construct and simulate a get_results transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_results: (options?: MethodOptions) => Promise<AssembledTransaction<Map<string, u32>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAEdm90ZQAAAAEAAAAAAAAAD3NlbGVjdGVkX29wdGlvbgAAAAAQAAAAAQAAA+wAAAAQAAAABA==",
        "AAAAAAAAAAAAAAAJaW5pdF9wb2xsAAAAAAAAAgAAAAAAAAAIcXVlc3Rpb24AAAAQAAAAAAAAAAdvcHRpb25zAAAAA+oAAAAQAAAAAA==",
        "AAAAAAAAAAAAAAALZ2V0X3Jlc3VsdHMAAAAAAAAAAAEAAAPsAAAAEAAAAAQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    vote: this.txFromJSON<Map<string, u32>>,
        init_poll: this.txFromJSON<null>,
        get_results: this.txFromJSON<Map<string, u32>>
  }
}