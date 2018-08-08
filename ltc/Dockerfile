FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN apt-get update
RUN apt-get install -y build-essential

RUN mkdir -p /root/.litecoin
ADD . /root/.litecoin

COPY . /data/
WORKDIR /data/
RUN tar -zxvf litecoin-0.16.0-x86_64-linux-gnu.tar.gz
RUN cp litecoin-0.16.0/bin/litecoind /usr/local/bin/
RUN chmod +x /usr/local/bin/litecoind
RUN cp litecoin-0.16.0/bin/litecoin-cli /usr/local/bin/
RUN chmod +x /usr/local/bin/litecoin-cli
