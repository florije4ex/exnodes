FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN mkdir -p /root/.ethereum-classic
ADD . /root/.ethereum-classic

COPY . /data/
WORKDIR /data/
RUN mkdir -p /data/private/keystore
RUN cp /data/keys/UTC* /data/private/keystore
RUN tar -zxvf geth-classic-linux-v5.5.1-8a3bc2d.tar.gz
RUN cp geth /usr/local/bin/
RUN chmod +x /usr/local/bin/geth