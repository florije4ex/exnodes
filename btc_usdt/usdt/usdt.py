# -*- coding: utf-8 -*-

import json
import random
import logging
import subprocess

logging.basicConfig(filename='usdt.log', level=logging.INFO, format='%(asctime)s %(message)s', )
logger = logging.getLogger('usdt')

# https://steemit.com/usdt/@chaimyu/omni-usdt-raw-transaction
# https://github.com/OmniLayer/omnicore/wiki/Use-the-raw-transaction-API-to-create-a-Simple-Send-transaction

# mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz
# cSvBffFm5xuTbVpudAbrpkWmRX5TnKk7zwUx62g2PgNDn85fkSDq
# n3kNWfBKHqAQYJXKSwUqz1M2M6vLPtRoc4
# cPxUHW3zZi7YsWrGS4rwiQRJ97GWn9Hw7BM3AuD6qmTHnHCK9CNy


def exec_cmd(cmd):
    logger.info(cmd)
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, errout = p.communicate()
    if errout:
        logger.error('error: {}'.format(errout))
        return ""
    else:
        logger.info('success: {}'.format(stdout))
        return stdout


def import_key(key):
    cmd = 'omnicore-cli importprivkey {}'.format(key)
    exec_cmd(cmd)


def gen_blk(num):
    cmd = 'omnicore-cli generate {}'.format(num)
    exec_cmd(cmd)


def send_btc(addr, amt):
    cmd = 'omnicore-cli sendtoaddress {addr} {amt}'.format(addr=addr, amt=amt)
    exec_cmd(cmd)


def create_contract():
    cmd = 'omnicore-cli "omni_sendissuancefixed" "mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz" 2 2 0 "Companies" ' \
          '"Bitcoin Mining" "Quantum Miner" "" "" "1000000"'
    exec_cmd(cmd)


def get_unspent(addr):
    cmd = 'omnicore-cli "listunspent" 0 999999 \'["{}"]\''.format(addr)
    return exec_cmd(cmd)


def simple_send():
    cmd = 'omnicore-cli "omni_send" "mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz" "n3kNWfBKHqAQYJXKSwUqz1M2M6vLPtRoc4"' \
          ' 2147483651 "100.01"'
    return exec_cmd(cmd)


def simple_data(amt):
    cmd = 'omnicore-cli "omni_createpayload_simplesend" 2147483651 "{}"'.format(amt)
    return exec_cmd(cmd)


def create_raw_tx(unspent):
    cmd = 'omnicore-cli "createrawtransaction" \'[{"txid":"%s","vout":%r}]\' \'{}\'' % (unspent[0].get('txid'), unspent[0].get('vout'))
    return exec_cmd(cmd)


def create_op_return(raw_tx, simple_send_data):
    cmd = 'omnicore-cli "omni_createrawtx_opreturn" "{raw_tx}" "{simple_data}"'.format(raw_tx=raw_tx,
                                                                                       simple_data=simple_send_data)
    return exec_cmd(cmd)


def create_raw_tx_reference(op_return, to_addr):
    cmd = 'omnicore-cli "omni_createrawtx_reference" "{op_return}" "{to_addr}"'.format(op_return=op_return,
                                                                                       to_addr=to_addr)
    return exec_cmd(cmd)


def create_raw_tx_change(raw_tx_reference, unspent, change_addr, fee=0.0006):
    cmd = 'omnicore-cli "omni_createrawtx_change" "%s" \'[{"txid":"%s","vout":%d,' \
          '"scriptPubKey":"%s","value":%r}]\' "%s" %r' % (raw_tx_reference, unspent[0].get('txid'),
                                                          unspent[0].get('vout'), unspent[0].get('scriptPubKey'),
                                                          unspent[0].get('amount'), change_addr, fee)
    return exec_cmd(cmd)


def sign_raw_tx(raw_tx_change):
    cmd = 'omnicore-cli "signrawtransaction" "{}"'.format(raw_tx_change)
    return exec_cmd(cmd)


def send_raw_tx(signed_raw_tx):
    cmd = 'omnicore-cli "sendrawtransaction" "{}"'.format(signed_raw_tx)
    return exec_cmd(cmd)


def main():
    keys = ['cSvBffFm5xuTbVpudAbrpkWmRX5TnKk7zwUx62g2PgNDn85fkSDq',
            'cPxUHW3zZi7YsWrGS4rwiQRJ97GWn9Hw7BM3AuD6qmTHnHCK9CNy',
            'cTCQpRwPsTvy3GpRwJhWCt39vdomKCjGEWCbvK3CwctUJuKiDDFy',
            'cPPeDZif8qWLUD9bff91RCJWK3qBS3sPH2MpJMvhmG7TXCv5adCJ',
            'cPkgFXKnFCGUhvWdaJnq6wAcBhRYzqiMAep9JgRxadKuGC3gtuuu',
            'cR1duUaPvVP6p7ocAJHbgzJNXssR2tMwueoq7c5XmWETUeeMRtp2',
            'cUGqzmEafUfXzkjAzkii2MBae6bUgBErShWeQqd26jZkag9L3qRm']  # 'ms5bjgzea8f1UyE5GJbmrp5UYiQS8NyeHf'
    for key in keys:
        import_key(key)
    gen_blk(101)
    send_btc('mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz', 10)
    gen_blk(1)
    create_contract()  # propertyid is 2147483651
    gen_blk(1)
    unspent = get_unspent('mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz')
    unspent = json.loads(unspent)
    # print(simple_send())
    simple_send_data = simple_data(2.55)
    raw_tx = create_raw_tx(unspent)
    op_return = create_op_return(raw_tx.strip(), simple_send_data.strip())
    raw_tx_reference = create_raw_tx_reference(op_return.strip(), 'mobuGfMnGG6hJfwQSpkigp18zsiUbwMR2z')  # n3kNWfBKHqAQYJXKSwUqz1M2M6vLPtRoc4
    raw_tx_change = create_raw_tx_change(raw_tx_reference.strip(), unspent, 'mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz')
    signed_raw_tx = sign_raw_tx(raw_tx_change.strip())
    txn = send_raw_tx(json.loads(signed_raw_tx).get('hex'))
    print(txn)
    gen_blk(1)


def send(addr, amt):
    unspent = get_unspent('mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz')
    unspent = json.loads(unspent)
    print(unspent)
    simple_send_data = simple_data(amt)
    raw_tx = create_raw_tx(unspent)
    op_return = create_op_return(raw_tx.strip(), simple_send_data.strip())
    raw_tx_reference = create_raw_tx_reference(op_return.strip(), addr)
    raw_tx_change = create_raw_tx_change(raw_tx_reference.strip(), unspent, 'mq3nhdYvzxbSAdPsTG4YBjbKvzRD6PXYRz')
    signed_raw_tx = sign_raw_tx(raw_tx_change.strip())
    txn = send_raw_tx(json.loads(signed_raw_tx).get('hex'))
    print(txn)
    gen_blk(1)


if __name__ == '__main__':
    # for i in range(1, 11):
    #     send(to_addrs[random.randint(0, len(to_addrs) - 1)], round(random.uniform(0.5, 4.5), 2))  # data
    # gen_blk(3)

    # send_btc('mobuGfMnGG6hJfwQSpkigp18zsiUbwMR2z', 2)
    # gen_blk(3)
    # 2.55

    main()
    to_addrs = ['mfnhAFNK2TXBN7DNgdtmrC9iukGLtmyyha',
                'mjAsgJUFhknFPUbTK9SbKWFnLMzHh9eK1t', 'n12HjS3HmyKQ6BrNVsm4mDiEVv4w5NaDDe',] # 'mobuGfMnGG6hJfwQSpkigp18zsiUbwMR2z'

    for addr in to_addrs:
        send(addr, 2.55)  # data round(random.uniform(0.5, 4.5), 2)
    gen_blk(1)

    # send_btc('ms5bjgzea8f1UyE5GJbmrp5UYiQS8NyeHf', 2)
    # gen_blk(1)
    # send_btc('ms5bjgzea8f1UyE5GJbmrp5UYiQS8NyeHf', 2)
    # gen_blk(1)
    # send_btc('ms5bjgzea8f1UyE5GJbmrp5UYiQS8NyeHf', 2)
    # gen_blk(1)
