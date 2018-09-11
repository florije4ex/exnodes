# ETC Usage

```
wget https://github.com/ethereumproject/go-ethereum/releases/download/v5.5.1/geth-classic-linux-v5.5.1-8a3bc2d.tar.gz

personal.newAccount("123456")
personal.unlockAccount("0x409ae6002b26a81c6ca1ed9ae8fcc9f75c0d7b32", "123456", 0)
eth.getBalance("0x409ae6002b26a81c6ca1ed9ae8fcc9f75c0d7b32")
eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value: web3.toWei(1, "ether")})
```