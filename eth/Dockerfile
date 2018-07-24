FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt-get update
RUN apt-get install -y ethereum

#ENTRYPOINT ["geth", "--datadir", "/data", "--dev", "--rpc", "--rpcaddr", "0.0.0.0", "--rpcapi=eth,net,web3"]
#ENTRYPOINT ["geth", "--config", "/data/config.toml"]