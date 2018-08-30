FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:bitcoin-abc/ppa
RUN apt-get update
RUN apt-get install -y bitcoind

RUN mkdir -p /root/.bitcoin
ADD . /root/.bitcoin