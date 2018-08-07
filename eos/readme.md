## eos


## 主网
```
wget https://raw.githubusercontent.com/CryptoLions/EOS-MainNet/master/genesis.json
wget https://raw.githubusercontent.com/CryptoLions/EOS-MainNet/master/config.ini
nodeos --data-dir . --config-dir . --genesis-json genesis.json
然后重启
nodeos --data-dir . --config-dir .
```

## 测试