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

api.on('ledger', ledger => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(JSON.stringify(ledger, null, 2));
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
});

function main() {
    const account = 'rfLnd6TnxinGD8dHBfTcGEHAoBzoGWuyVw';
    api.connect().then(() => {
        if (api.isConnected()) {
            console.log('connected');
        }
        api.connection.on('transaction', (event) => {
            console.log(JSON.stringify(event, null, 2))
        });
        api.request('subscribe', {
            accounts: [ account ]
        }).then(response => {
            if (response.status === 'success') {
                console.log('Successfully subscribed');
            }
        }).catch(error => {
            console.log(error);
        })
    }).catch(e => {
        console.log(e.message);
    });
}

main();