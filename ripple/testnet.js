'use strict';
//
// https://developers.ripple.com/list-xrp-as-an-exchange.html
// https://blog.csdn.net/vohyeah/article/details/80868313
// https://developers.ripple.com/get-started-with-rippleapi-for-javascript.html

const RippleAPI = require('ripple-lib').RippleAPI;
const request = require('request-promise');
const sleep = require('sleep');

const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net:51233'
});

api.on('error', (errorCode, errorMessage) => {
    console.log(errorCode + ': ' + errorMessage);
});

api.on('connected', () => {
    console.log('api connected');
});

api.on('disconnected', () => {
    console.log('disconnected');
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
    try {
        console.log('Get account: ', addr);
        let info = await api.getAccountInfo(addr);
        console.log(info);
    } catch (e) {
        console.log(e);
    }
}

async function getSetting(addr) {
    try {
        console.log('Get setting: ', addr);
        let setting = await api.getSettings(addr);
        console.log(setting);
    } catch (e) {
        console.log(e);
    }
}

async function pay(from, to, amount, secret) {
    const payment = {
        "source": {
            "address": from,
            "maxAmount": {
                "value": amount,
                "currency": "XRP"
            }
        },
        "destination": {
            "tag": 10086,
            "address": to,
            "amount": {
                "value": amount,
                "currency": "XRP"
            }
        }
    };
    try {
        let ledger = await api.getLedger();
        let prepared = await api.preparePayment(from, payment);
        console.log('prepared:');
        console.log(prepared);
        await sendTxn(prepared, secret, ledger);
    } catch (e) {
        console.log(e);
    }
}

async function setting(addr, secret) {
    try {
        let ledger = await api.getLedger();
        const settings = {requireDestinationTag: true};
        const instructions = {maxLedgerVersionOffset: 100};
        let prepared = await api.prepareSettings(addr, settings, instructions);
        console.log('prepared:');
        console.log(prepared);
        await sendTxn(prepared, secret, ledger);
    } catch (e) {
        console.log(e);
    }
}

async function verify(hash, options) {
    try {
        let res = await api.getTransaction(hash, options);
        console.log(res);
        return res.outcome.result === 'tesSUCCESS';
    } catch (e) {
        if (e instanceof api.errors.PendingLedgerVersionError) {
            return false;
        }
    }
}

async function sendTxn(prepared, secret, ledger) {
    const options = {
        minLedgerVersion: ledger.ledgerVersion,
        maxLedgerVersion: prepared.instructions.maxLedgerVersion
    };
    try {
        let signedTxn = await api.sign(prepared.txJSON, secret);
        console.log('signedTxn:');
        console.log(signedTxn);
        let result = await api.submit(signedTxn.signedTransaction);
        console.log('result:');
        console.log(result);
        if (result.resultCode === 'tesSUCCESS') {
            console.log('txHash:', signedTxn.id);
        }
        while (!await verify(signedTxn.id, options)) {
            sleep.sleep(3);
        }
    } catch (e) {
        console.log(e);
    }
}

(async () => {
    try {
        await api.connect();
        console.log(genAddr());
        let acc1 = await getAcc();
        console.log(acc1);
        let acc2 = await getAcc();
        console.log(acc2);
        sleep.sleep(10);
        await getAccInfo(acc1.account.address);
        await getAccInfo(acc2.account.address);
        await getSetting(acc2.account.address);
        await setting(acc2.account.address, acc2.account.secret);
        await getSetting(acc2.account.address);
        await pay(acc1.account.address, acc2.account.address, "10", acc1.account.secret);
        await getAccInfo(acc1.account.address);
        await getAccInfo(acc2.account.address);
    } catch (e) {
        console.log(e);
    } finally {
        await api.disconnect();
    }
})().catch((e) => {
    console.log(e);
});