FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y software-properties-common \
    && add-apt-repository -y ppa:bitcoin/bitcoin \
    && apt-get update \
    && apt-get install -y bitcoind \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /root/.bitcoin
ADD . /root/.bitcoin

#ENTRYPOINT ["bitcoind", "-datadir=/data"]