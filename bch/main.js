'use strict';

const bch = require('bitcoincashjs');

function genKey() {
    let privateKey = new bch.PrivateKey(bch.Networks.testnet);
    let address = privateKey.toAddress();
    console.log(privateKey.toWIF(), address.toString());
    // cVxaYg2CwT11nchaZzcBmNLYfAofpeQG2tLUZcXsFT2gDSiNEobT msf3qZqgYDMQ4rwwuY18E8WQX9Xc14ZtC7
}

function sign() {
    let wif = 'cPQr2JNpMQQ1YH5CxxCMHWTJwTjkNczM3rvx2fJk3rXwpfpVtzVe';
    let privateKey = new bch.PrivateKey(wif, bch.Networks.testnet);
    let address = privateKey.toAddress(); // mqTZduXuMeaJp26dc985RawoHNNdeqphjE
    console.log(address.toString());

    let utxo1 = {
        'txId' : 'e3298af578f83b72680b721b95c449b8b40e53467f16a51cabbb70a0dac0386d',
        'outputIndex' : 0,
        'script' : '76a9146d0d18a37a343add6e361a01102e24e0ebae358688ac',
        'satoshis' : 100000000
    };
    let utxo2 = {
        'txId' : '2c0f9b52c8446fc00dce343cb72c4c74f559c227698d258b5d38b6c78c2c845e',
        'outputIndex' : 1,
        'script' : '76a9146d0d18a37a343add6e361a01102e24e0ebae358688ac',
        'satoshis' : 100000000
    };
    // let txn = new bch.Transaction().addInput()
    //     .from(utxo)
    //     .to('msf3qZqgYDMQ4rwwuY18E8WQX9Xc14ZtC7', 1000000000 - 10000)
    //     .change('mqTZduXuMeaJp26dc985RawoHNNdeqphjE')
    //     .fee(500)
    //     .sign(privateKey);
    let txn = new bch.Transaction();
    txn.from(utxo1);
    txn.from(utxo2);
    txn.to('msf3qZqgYDMQ4rwwuY18E8WQX9Xc14ZtC7', 200000000 - 10000);
    txn.change('mqTZduXuMeaJp26dc985RawoHNNdeqphjE');
    txn.fee(500);
    txn.sign(privateKey);

    console.log(txn.toString());
}

function convertAddr() {
    const Address = bch.Address;
    const fromString = Address.fromString;
    const CashAddrFormat = Address.CashAddrFormat;

    let cashaddr = fromString('bchreg:qpks6x9r0g6r4htwxcdqzypwynswht34scaxk2wltu', 'regtest', 'pubkeyhash', CashAddrFormat);
    console.log(cashaddr.toString());

    let legacy = fromString('mqTZduXuMeaJp26dc985RawoHNNdeqphjE', 'regtest', 'pubkeyhash');
    console.log(legacy.toString(CashAddrFormat));
}

sign();
