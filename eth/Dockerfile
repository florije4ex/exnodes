FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y software-properties-common \
    && add-apt-repository -y ppa:ethereum/ethereum \
    && apt-get update \
    && apt-get install -y ethereum \
    && rm -rf /var/lib/apt/lists/*

#ENTRYPOINT ["geth", "--datadir", "/data", "--dev", "--rpc", "--rpcaddr", "0.0.0.0", "--rpcapi=eth,net,web3"]
#ENTRYPOINT ["geth", "--config", "/data/config.toml"]