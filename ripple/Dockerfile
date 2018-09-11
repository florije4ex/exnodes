FROM ubuntu:xenial
MAINTAINER florije4ex <florije4ex@gmail.com>

RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y yum-utils alien \
    && rpm -Uvh https://mirrors.ripple.com/ripple-repo-el7.rpm \
    && yumdownloader --enablerepo=ripple-stable --releasever=el7 rippled \
    && rpm --import https://mirrors.ripple.com/rpm/RPM-GPG-KEY-ripple-release && rpm -K rippled*.rpm \
    && alien -i --scripts rippled*.rpm && rm rippled*.rpm \
    && rm -rf /var/lib/apt/lists/*

ADD ./rippled.cfg /root/rippled.cfg