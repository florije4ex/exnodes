# Usage

## links
```text
https://hub.docker.com/r/cityofzion/neo-privatenet/
https://github.com/slipo/neo-scan-docker.git
可能需要绑定127.0.0.1 neo-privnet
```

## operation
```text
1. git clone https://github.com/slipo/neo-scan-docker.git
2. cd neo-scan-docker && docker-compose up -d
备注：如需要neo-python需要
1. docker exec -it neo-privnet /bin/bash
删除旧数据:rm -rf /root/.neopython/Chains/privnet* 

open wallet neo-privnet.wallet
password is coz
wallet rebuild
wallet命令可以看。
```

## rpc
`http://docs.neo.org/en-us/node/cli/2.9.0/api.html`

### getbestblockhash
```http request
curl -X POST \
  http://localhost:30333 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getbestblockhash","params":[],"id":1}'
```

### getblockcount
```http request
curl -X POST \
  http://localhost:30333 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}'
```

### getbalance
```http request
curl -X POST \
  http://localhost:30333 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getbalance","params":["c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"],"id":1}'
```

### getblock
```http request
curl -X POST \
  http://localhost:30333 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getblock","params":[20653, 1],"id":1}'
```

### getblockhash
```http request
curl -X POST \
  http://localhost:30333 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getblockhash","params":[23356],"id":1}'
```

### getrawtransaction
```http request
curl -X POST \
  http://localhost:30333 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getrawtransaction","params":["0xbf9fdb59b30a6ba5edce6c7e7d763b4138bcd94aec04e6c932e4d6ddd22481fa", 1],"id":1}'
```