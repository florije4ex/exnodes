'use strict';

const EthereumTx = require('ethereumjs-tx');
const keythereum = require("keythereum");

function convert(num) {
    console.log(num.toString(16));
}

function getKey() {
    let keyObject = {"id":"9337de9d-909a-4774-9a59-1f4901732710","address":"409ae6002b26a81c6ca1ed9ae8fcc9f75c0d7b32","crypto":{"cipher":"aes-128-ctr","ciphertext":"8090a72b3bcfde7fc88aba7dc319d050a07b3eca67240f5cf4b01d5f8b1da84b","cipherparams":{"iv":"48628ae94db3e6e0bc2533a42b1a837d"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"f7803b8705e29d2bc2bbaf7584440b03b3d2e553202100b113a6779c97dfeebe"},"mac":"84e33af405ed8f665f52653d6523fcc602d476f8a1f8b309e5648b92e2ee7c3d"},"version":3};
    let privateKey = keythereum.recover('123456', keyObject);
    console.log(privateKey.toString('hex'));
    // 8c906b17b9bbb13d47f2c581fefb91ee4ae3e1eb4e20063736428db804697765
    // 0x409ae6002b26a81c6ca1ed9ae8fcc9f75c0d7b32
}

function genTx() {
    const privateKey = Buffer.from('8c906b17b9bbb13d47f2c581fefb91ee4ae3e1eb4e20063736428db804697765', 'hex');

    const txParams = {
        nonce: '0x100000',
        gasPrice: '0x09184e72a000',
        gasLimit: '0x5208',
        to: '0x55da9b16f84890a0cc5d758d554eeb4b8dcda2d3',
        value: '0xde0b6b3a7640000',
        data: '',
        // EIP 155 chainId - mainnet: 1, ropsten: 3
        // chainId: 62
    };

    const tx = new EthereumTx(txParams);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    console.log(serializedTx.toString('hex'));
}

// getKey();
// convert(21000);
genTx();