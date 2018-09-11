'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
    server: 'ws://localhost:6006'
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

async function ledgerAccept(api) {
    const request = {command: 'ledger_accept'};
    return await api.connection.request(request);
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
        let id = await ledgerAccept(api);
        console.log('ledgerAcceptId' + id);
    } catch (e) {
        console.log(e);
    }
}

async function pay(from, secret, to, amount) {
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

(async () => {
    try {
        await api.connect();
        let addrObj = genAddr();
        console.log(addrObj);
        await getAccInfo(addrObj.address);
        await pay('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'snoPBrXtMeMyMHUVTgbuqAfg1SUTb', addrObj.address, '200');
        await getAccInfo(addrObj.address);
    } catch (e) {
        console.log(e);
    } finally {
        await api.disconnect();
    }
})().catch((e) => {
    console.log(e);
});