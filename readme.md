# Usage

项目用来跑节点

目前支持节点包括：btc，usdt，eth

## BTC
```
cd btc
docker-compose up -d
curl --user user:pass --data-binary '{"jsonrpc": "1.0", "id":"1", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```