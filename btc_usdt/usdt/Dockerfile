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
RUN tar -zxvf omnicore-0.3.0-x86_64-linux-gnu.tar.gz
RUN cp omnicore-0.3.0/bin/omnicored /usr/local/bin/
RUN chmod +x /usr/local/bin/omnicored
RUN cp omnicore-0.3.0/bin/omnicore-cli /usr/local/bin/
RUN chmod +x /usr/local/bin/omnicore-cli

#ENTRYPOINT ["omnicored", "-datadir=/data"]