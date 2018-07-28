# Usage

项目用来跑节点

目前支持节点包括：btc，usdt，eth

## BTC
```
cd btc
docker-compose up -d
curl --user user:pass --data-binary '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
docker-compose down
```

## USDT
```
cd usdt
wget https://github.com/OmniLayer/omnicore/releases/download/v0.3.0/omnicore-0.3.0-x86_64-linux-gnu.tar.gz
docker-compose up -d
curl -X POST http://localhost:8338/ -H 'authorization: Basic dXNlcjpwYXNz' -H 'content-type: application/json' -d '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }'
docker-compose down
```

## ETH
```
cd eth
docker-compose up -d
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://127.0.0.1:8545
docker-compose down

备注：
geth --datadir /data --dev --rpc --rpcaddr 0.0.0.0 --rpcapi=eth,net,web3 dumpconfig > config.toml 
```

