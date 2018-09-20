# Usage

项目用来跑节点

目前支持节点包括：btc, ltc, bch, usdt, eth, etc

## BTC
```
cd btc
docker-compose up -d
curl -X POST http://localhost:8339/ -H 'content-type: application/json' -d '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }'
docker-compose down
```

## BCH
```
cd btc
docker-compose up -d
curl -X POST http://localhost:8340/ -H 'content-type: application/json' -d '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }'
docker-compose down
```

## LTC
```
cd btc
docker-compose up -d
curl -X POST http://localhost:9339/ -H 'content-type: application/json' -d '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }'
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

## BTC && USDT

```
cd btc_usdt/btc; wget https://bitcoincore.org/bin/bitcoin-core-0.15.0/bitcoin-0.15.0-x86_64-linux-gnu.tar.gz
cd btc_usdt/usdt; wget https://github.com/OmniLayer/omnicore/releases/download/v0.3.0/omnicore-0.3.0-x86_64-linux-gnu.tar.gz
docker-compose up -d
curl -X POST http://localhost:9348/ -H 'content-type: application/json' -d '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }'
curl -X POST http://localhost:9349/ -H 'content-type: application/json' -d '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }'
docker-compose down
```

## ETH
```
cd eth
docker-compose up -d
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://127.0.0.1:8545
docker-compose down

备注:
geth --datadir /data --dev --rpc --rpcaddr 0.0.0.0 --rpcapi=eth,net,web3 dumpconfig > config.toml 
```

## ETC
```
cd etc
docker-compose up -d
curl -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://127.0.0.1:8545
docker-compose down
```

## clear
```
docker container prune
docker images|grep none|awk '{print $3 }'|xargs docker rmi
```