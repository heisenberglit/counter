import * as anchor from "@project-serum/anchor";
import {Program, web3} from "@project-serum/anchor";
import { Counter } from "../target/types/counter";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const provider = anchor.getProvider();

  it("Is initialized!", async () => {
    const keypair = web3.Keypair.generate();
    const wallet = provider.publicKey;
    console.log(wallet.toBase58());
    // Add your test here.
    const tx = await program.methods.initialize(new anchor.BN(20)).accounts({
      myAccount: keypair.publicKey,
      signer: wallet,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([keypair]).rpc().catch((e) => {
      console.log(e);
    });
    console.log("Your transaction signature", tx);
  });
});
