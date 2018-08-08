#!/usr/bin/env bash
docker-compose down
rm -rf btc/regtest/
rm -rf usdt/regtest/
docker-compose up -d
docker exec -it dev_bu_usdt /bin/bash