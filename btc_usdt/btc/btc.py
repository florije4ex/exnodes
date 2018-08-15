# -*- coding: utf-8 -*-

import logging
import subprocess

logging.basicConfig(filename='btc.log', level=logging.INFO, format='%(asctime)s %(message)s', )
logger = logging.getLogger('btc')


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
    cmd = 'bitcoin-cli importprivkey {}'.format(key)
    exec_cmd(cmd)


def gen_blk(num):
    cmd = 'bitcoin-cli generate {}'.format(num)
    exec_cmd(cmd)


def send_btc(addr, amt):
    cmd = 'bitcoin-cli sendtoaddress {addr} {amt}'.format(addr=addr, amt=amt)
    exec_cmd(cmd)


def main():
    keys = ['cSvBffFm5xuTbVpudAbrpkWmRX5TnKk7zwUx62g2PgNDn85fkSDq',
            'cPxUHW3zZi7YsWrGS4rwiQRJ97GWn9Hw7BM3AuD6qmTHnHCK9CNy',
            'cTCQpRwPsTvy3GpRwJhWCt39vdomKCjGEWCbvK3CwctUJuKiDDFy',
            'cPPeDZif8qWLUD9bff91RCJWK3qBS3sPH2MpJMvhmG7TXCv5adCJ',
            'cPkgFXKnFCGUhvWdaJnq6wAcBhRYzqiMAep9JgRxadKuGC3gtuuu',
            'cR1duUaPvVP6p7ocAJHbgzJNXssR2tMwueoq7c5XmWETUeeMRtp2',
            'cUGqzmEafUfXzkjAzkii2MBae6bUgBErShWeQqd26jZkag9L3qRm']
    for key in keys:
        import_key(key)
    # gen_blk(101)
    # send_btc('ms5bjgzea8f1UyE5GJbmrp5UYiQS8NyeHf', 10)
    # gen_blk(1)


if __name__ == '__main__':
    main()
