import { Buffer } from "buffer";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Spec as ContractSpec,
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
} as const;

export interface Client {
  /**
   * SorobanPollContract::create_poll
   */
  create_poll: (args: { question: string; options: Array<string> }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;

  /**
   * SorobanPollContract::cast_vote
   */
  cast_vote: (args: { voter: string; option_index: number }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
}

export class Client extends ContractClient {
  static async deploy<T = Client>(
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        wasmHash: Buffer | string;
        salt?: Buffer | Uint8Array;
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options);
  }

  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([
        // create_poll spec
        "AAAAAAAAAAAAAAALY3JlYXRlX3BvbGwAAAAAAAAAgAAAAAAAAAIcXVlc3Rpb24AAAAQAAAAAAAAAAdvcHRpb25zAAAAA+oAAAAQAAAAAA==",
        // cast_vote spec
        "AAAAAAAAAAAAAAAJY2FzdF92b3RlAAAAAAAAAgAAAAAAAAAFdm90ZXIAAAAQAAAAAAAAAAxvcHRpb25faW5kZXgAAAAAAAADAAAAAA=="
      ]),
      options
    );
  }

  public readonly fromJSON = {
    create_poll: this.txFromJSON<null>,
    cast_vote: this.txFromJSON<null>
  };
}
