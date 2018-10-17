'use strict';

const Neon = require('@cityofzion/neon-js');

async function sendAssert(assertId, receiver, amount) {
    const privateKey = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr';
    const rpcUrl = 'http://localhost:30333';
    const scanUrl = 'http://localhost:4000/api/main_net';

    let account = new Neon.wallet.Account(privateKey);
    let intent = {
        assetId: assertId,
        value: new Neon.u.Fixed8(amount),
        scriptHash: Neon.wallet.getScriptHashFromAddress(receiver)};
    let intents = [intent];
    let balance = await Neon.api.neoscan.getBalance(scanUrl, account.address);
    let tmpTx = new Neon.tx.ContractTransaction({ outputs: intents });
    tmpTx.calculate(balance, undefined, 0);

    // this will complete outputs and inputs
    let tx = new Neon.tx.ContractTransaction({ outputs: tmpTx.outputs, inputs: tmpTx.inputs });
    let txString = tx.serialize(false);

    let sig = Neon.wallet.sign(txString, privateKey);
    let witness = Neon.tx.Witness.fromSignature(sig, account.publicKey);
    let signature = witness.serialize();
    tx.scripts.push(Neon.tx.Witness.deserialize(signature));
    let rawTx = tx.serialize(true);
    console.log('Tx hash is: ' + tx.hash);
    let block = await Neon.rpc.Query.getBlockCount().execute(rpcUrl);
    console.log('Block height: ' + block.result);
    let resp = await Neon.rpc.Query.sendRawTransaction(rawTx).execute(rpcUrl);
    if (resp.result) {
        console.log('success!');
    } else {
        console.log('error!');
    }
}

(async () => {
    const assertIds = {
        NEO: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
        GAS: '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'
    };
    const receiver = 'Ab6frjKP5EJw7WPxfU4aR5wqTMtfMLrQz6';
    await sendAssert(assertIds.GAS, receiver, 1);
})();