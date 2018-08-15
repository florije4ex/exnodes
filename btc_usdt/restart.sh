#!/usr/bin/env bash
docker-compose down
rm -rf btc/regtest/
rm btc/btc.log
rm -rf usdt/regtest/
rm usdt/usdt.log
docker-compose up -d
docker exec -it dev_bu_usdt /bin/bash