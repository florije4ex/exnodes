# BCH Usage

```
wget https://download.bitcoinabc.org/0.17.2/linux/bitcoin-abc-0.17.2-x86_64-linux-gnu.tar.gz

bitcoin-cli generate 102
bitcoin-cli sendtoaddress mqTZduXuMeaJp26dc985RawoHNNdeqphjE 1
bitcoin-cli sendtoaddress mqTZduXuMeaJp26dc985RawoHNNdeqphjE 1
bitcoin-cli generate 1
bitcoin-cli getblock block_hash
查看tx hash
然后
bitcoin-cli getrawtransaction tx_hash
bitcoin-cli decoderawtransaction raw_tx
查看tx详细信息。
执行main.js组装好之后广播：
bitcoin-cli sendrawtransaction result
```