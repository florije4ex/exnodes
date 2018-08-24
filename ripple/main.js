'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;
const request = require('request-promise');
const sleep = require('sleep');

const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net:51233'
});

function genAddr() {
    return api.generateAddress();
}

async function getAcc() {
    let option = {
        method: 'POST',
        uri: 'https://faucet.altnet.rippletest.net/accounts',
        json: true
    };
    return await request(option);
}

async function getAccInfo(addr) {
    await api.connect();
    try {
        return await api.getAccountInfo(addr);
    } catch (e) {
        console.log(e);
    } finally {
        await api.disconnect();
    }
}

async function pay(from, to, amount, secret) {
    const payment = {
        "source": {
            "address": from,
            "amount": {
                "value": amount,
                "currency": "XRP"
            }
        },
        "destination": {
            "address": to,
            "minAmount": {
                "value": amount,
                "currency": "XRP"
            }
        }
    };
    await api.connect();
    try {
        let prepared = await api.preparePayment(from, payment);
        console.log('prepared:');
        console.log(prepared);
        let signedTxn = await api.sign(prepared.txJSON, secret);
        console.log('signedTxn:');
        console.log(signedTxn);
        let result = await api.submit(signedTxn.signedTransaction);
        console.log('result:');
        console.log(result);
        if (result.resultCode === 'tesSUCCESS') {
            console.log('txHash:', signedTxn.id);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await api.disconnect();
    }
}

(async() => {
    // let addr = api.generateAddress();
    let acc1 = await getAcc();
    console.log(acc1);
    let acc2 = await getAcc();
    console.log(acc2);
    sleep.sleep(10);
    console.log(await getAccInfo(acc1.account.address));
    console.log(await getAccInfo(acc2.account.address));
    await pay(acc1.account.address, acc2.account.address, "10", acc1.account.secret);
    sleep.sleep(10);
    console.log(await getAccInfo(acc1.account.address));
    console.log(await getAccInfo(acc2.account.address));
})().catch((e) => {console.log(e);});