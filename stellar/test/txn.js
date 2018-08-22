'use strict';

const StellarSdk = require('stellar-sdk');
const request = require('request');

let baseUrl = 'http://localhost:8000';

StellarSdk.Config.setAllowHttp(true);
const server = new StellarSdk.Server(baseUrl);
// Stellar.Network.useTestNetwork();
StellarSdk.Network.use(new StellarSdk.Network("Private SDF Network ; September 2018"));

let pair = StellarSdk.Keypair.random();
console.log('secret: ', pair.secret(), ' public: ', pair.publicKey());

let toPair = StellarSdk.Keypair.fromSecret('SBMIAVFLTJSD56ECKQSH5GR5YDZ4CXQRG5XUTZD7OESABQLVW3R5KGQ5');

function friendbot() {
    request.get({
        url: baseUrl + '/friendbot',
        qs: { addr: pair.publicKey() },
        json: true
    }, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            console.error('ERROR!', error || body);
        }
        else {
            console.log('SUCCESS! You have a new account :)\n', body);
            accounts();
        }
    });
}

function accounts() {
    server.loadAccount(pair.publicKey()).then(function(account) {
        console.log('Balances for account: ' + pair.publicKey());
        account.balances.forEach(function(balance) {
            console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
        });
        request.get({
            url: baseUrl + '/friendbot',
            qs: { addr: toPair.publicKey() },
            json: true
        }, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                console.error('ERROR!', error || body);
            } else {
                console.log('SUCCESS! You have a new account :)\n', body);
                let transaction = new StellarSdk.TransactionBuilder(account)
                    .addOperation(StellarSdk.Operation.payment({
                        destination: toPair.publicKey(),
                        asset: StellarSdk.Asset.native(),
                        amount: "10"
                    }))
                    .addMemo(StellarSdk.Memo.text('Private Transaction'))
                    .build();
                transaction.sign(pair);
                server.submitTransaction(transaction).then(function (result) {
                    console.log('Success! Results:', result);
                }).catch(function (e) {
                    console.log(e);
                });
            }
        });
    }).catch(function (e) {
        console.log(e);
    });
}

friendbot();
