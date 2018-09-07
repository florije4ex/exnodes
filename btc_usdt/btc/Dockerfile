FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y python-pip python-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /root/.bitcoin
ADD . /root/.bitcoin

COPY . /data/
WORKDIR /data/
RUN tar -zxvf bitcoin-0.15.0-x86_64-linux-gnu.tar.gz
RUN cp bitcoin-0.15.0/bin/bitcoind /usr/local/bin/
RUN chmod +x /usr/local/bin/bitcoind
RUN cp bitcoin-0.15.0/bin/bitcoin-cli /usr/local/bin/
RUN chmod +x /usr/local/bin/bitcoin-cli

#ENTRYPOINT ["bitcoind", "-datadir=/data"]