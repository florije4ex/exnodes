# -*- coding: utf-8 -*-

import json
import requests

url = "http://localhost:8348/"

headers = {'content-type': "application/json"}


def gen_info():
    payload = {"jsonrpc": "2.0", "id": "1", "method": "generate", "params": [1]}
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    # print response.json()
    block_hash = response.json().get('result')[0]
    payload = {"jsonrpc": "2.0", "id": "2", "method": "getblock", "params": ["{}".format(block_hash)]}
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    # print response.json()
    tx_hash, height = response.json().get('result').get('tx')[0], response.json().get('result').get('height')
    payload = {"jsonrpc": "2.0", "id": "3", "method": "gettransaction", "params": ["{}".format(tx_hash)]}
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    # print response.json()
    amount = response.json().get('result').get('details')[0].get('amount')
    print '-' * 20 + 'height: {}, amount: {}.'.format(height, amount)


if __name__ == '__main__':
    for i in range(1, 1001):
        gen_info()  # 150
