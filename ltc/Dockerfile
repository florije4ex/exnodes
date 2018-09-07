FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /root/.litecoin
ADD . /root/.litecoin

COPY . /data/
WORKDIR /data/
RUN tar -zxvf litecoin-0.16.0-x86_64-linux-gnu.tar.gz
RUN cp litecoin-0.16.0/bin/litecoind /usr/local/bin/
RUN chmod +x /usr/local/bin/litecoind
RUN cp litecoin-0.16.0/bin/litecoin-cli /usr/local/bin/
RUN chmod +x /usr/local/bin/litecoin-cli
