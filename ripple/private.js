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
    let addrObj = api.generateAddress();
    console.log('addrObj:');
    console.log(addrObj);
    return addrObj;
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
        return true;
    } catch (e) {
        console.log('getAccInfo Exception: ', e.message);
        return false;
    }
}

async function getBalances(addr) {
    let balance = await api.getBalances(addr);
    console.log('balanceOf: ', addr, ' is: ', balance);
    return balance;
}

async function sendTxn(prepared, secret) {
    try {
        let signedTxn = await api.sign(prepared.txJSON, secret);
        console.log('signedTxn: ');
        console.log(signedTxn);
        let result = await api.submit(signedTxn.signedTransaction);
        console.log('result: ');
        console.log(result);
        if (result.resultCode === 'tesSUCCESS') {
            console.log('txHash: ', signedTxn.id);
        }
        let id = await ledgerAccept(api);
        console.log('ledgerAcceptId: ' + id.ledger_current_index);
        console.log('txn:');
        console.log(await api.getTransaction(signedTxn.id));
    } catch (e) {
        console.log(e);
    }
}

async function pay(from, secret, to, amount) {
    let instructions = {
            "fee": "0.000010",
    };
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
        },
        // "allowPartialPayment": true // XRP to XRP is not allowed
    };
    try {
        let prepared = await api.preparePayment(from, payment, instructions);
        console.log('prepared pay: ');
        console.log(prepared);
        return await sendTxn(prepared, secret);
    } catch (e) {
        console.log('pay Exception: ', e.message);
        return '';
    }
}

async function setRegularKey(addr, secret) {
    console.log('generate regular key:');
    let addrObj = genAddr();
    const settings = {regularKey: addrObj.address};
    try {
        let preparedRegularKey = await api.prepareSettings(addr, settings);
        console.log('prepared regularKey: ');
        console.log(preparedRegularKey);
        await sendTxn(preparedRegularKey, secret);
        return addrObj;
    } catch (e) {
        console.log('regularKey Exception: ', e.message);
        return null;
    }
}

async function setDestinationTag(addr, secret) {
    console.log('generate regular key:');
    const settings = {requireDestinationTag: true};
    try {
        let preparedRegularKey = await api.prepareSettings(addr, settings);
        console.log('prepared regularKey: ');
        console.log(preparedRegularKey);
        return await sendTxn(preparedRegularKey, secret);
    } catch (e) {
        console.log('regularKey Exception: ', e.message);
        return '';
    }
}

async function getSettings(addr) {
    let settings = await api.getSettings(addr);
    console.log('settings:');
    console.log(settings);
    return settings;
}

(async () => {
    const internalAddress = 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh';
    const internalSecret = 'snoPBrXtMeMyMHUVTgbuqAfg1SUTb';
    try {
        await api.connect();
        // init accounts from and to
        console.log('----------------------------------------------');
        // let fromAddr = genAddr();
        // let toAddr = genAddr();
        let fromAddr = {
            secret: 'shWxSHaBVqgnP3Es8VcJHVmN6yVKo',
            address: 're4FGNgQK1yqCTuzDyVMVJGMSkiYd67kM'
        };
        let toAddr = {
            secret: 'sn69m6bd2jKbUbK3mu3VkEcVrGKfV',
            address: 'rfLnd6TnxinGD8dHBfTcGEHAoBzoGWuyVw'
        };

        if (!await getAccInfo(fromAddr.address)) {
            await pay(internalAddress, internalSecret, fromAddr.address, '300');
        }
        if (!await getAccInfo(toAddr.address)) {
            await pay(internalAddress, internalSecret, toAddr.address, '250');
        }
        if (await getAccInfo(fromAddr.address)) {
            await getBalances(fromAddr.address);
        }
        if (await getAccInfo(toAddr.address)) {
            await getBalances(toAddr.address);
        }
        console.log('----------------------------------------------');
        // setting regularKey for to account
        let keyObj = null;
        if (JSON.stringify(await getSettings(fromAddr.address)) === '{}') {
            // set regularKey for from account
            keyObj = await setRegularKey(fromAddr.address, fromAddr.secret);
            await getSettings(fromAddr.address);
            // set destination tag for to account
            await setDestinationTag(toAddr.address, toAddr.secret);
            await getSettings(toAddr.address);
        }
        console.log('----------------------------------------------');
        // general payment
        await pay(fromAddr.address, keyObj.secret, toAddr.address, '10'); // use keyObj secret to sign txn
        await getBalances(fromAddr.address);
        await getBalances(toAddr.address);
        console.log('----------------------------------------------');
    } catch (e) {
        console.log(e);
    } finally {
        await api.disconnect();
    }
})().catch((e) => {
    console.log(e);
});