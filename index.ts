import { AptosConfig } from "@aptos-labs/ts-sdk";

import { Network } from "@aptos-labs/ts-sdk";

import { Aptos } from "@aptos-labs/ts-sdk";
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

async function main() {
 


    const config = new AptosConfig({ network: Network.MAINNET });
    const aptos = new Aptos(config);
    

    
    const PRIVATE_KEY = new Ed25519PrivateKey("ed25519-priv-0x7cf9a488636b2733e269919758ad5ef4c45caa66243fe691c3ec87cc6487475f"); // Replace with your private key
    const MY_ACCOUNT = Account.fromPrivateKey({ privateKey: PRIVATE_KEY });
    
    const myBalance = await aptos.getAccountAPTAmount({
        accountAddress: MY_ACCOUNT.accountAddress,
      });
      console.log(`Account balance: ${myBalance}`);
    
    
      const transaction = await aptos.transaction.build.simple({
        sender: MY_ACCOUNT.accountAddress,
        data: {
          function: "0x777b93e13ff2a1bc872eb4d099ae15a52fb70f2f01dd18d7c809e217fb0e543e::tba_exam::add_participant", 
          functionArguments: [
            "0x43a01324effb79a2758497cf1c5858457a0ee80f6f9b2dcd428be76a6e9e89e3",  // Participant address (must be valid)
            "Junfel Vargas Dalumpines",  // Full name of the participant
            "JunfelV",                  // GitHub username
            "junfeldalumpines@gmail.com",  // Email address
            "junfeld",                  // Discord username
          ],
        },
      });
      
      
    
      const senderAuthenticator = aptos.transaction.sign({
        signer: MY_ACCOUNT,
        transaction,
      });
    
      const pendingTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator,
      });
    
      const txnResult = await aptos.waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });
      
      // optional: so we can see if it succeeded
      
      console.log(
        `Transaction completed with status: ${
          txnResult.success ? "SUCCESS" : "FAILURE"
        }`
      );
   
}



main().catch(console.error);
main().catch(console.error);