# Usage

## init
```

```

## rpc
```
curl -X POST http://localhost:5005 -H 'Content-Type: application/json' -d '{"method":"ledger","params":[{"ledger_index":"validated","accounts":false,"full":false,"transactions":true,"expand":false,"owner_funds":false}]}'
curl -X POST http://localhost:5005 -H 'Content-Type: application/json' -d '{"method":"ledger","params":[{"ledger_index":55,"accounts":false,"full":false,"transactions":true,"expand":false,"owner_funds":false}]}'
curl -X POST http://localhost:5005 -H 'Content-Type: application/json' -d '{"method":"tx","params":[{"transaction":"13CE20216BA210E6685D019E18D704A85A2C82D587B14F86F2B49B6821555031","binary":false}]}'
```

## prd
```
sudo apt-get update
sudo apt-get install yum-utils alien
sudo rpm -Uvh https://mirrors.ripple.com/ripple-repo-el7.rpm
yumdownloader --enablerepo=ripple-stable --releasever=el7 rippled
sudo rpm --import https://mirrors.ripple.com/rpm/RPM-GPG-KEY-ripple-release && rpm -K rippled*.rpm
sudo alien -i --scripts rippled*.rpm && rm rippled*.rpm

path: /opt/ripple/bin/rippled
```

## prd cfg
```
https://github.com/ripple/rippled/blob/master/cfg/rippled-example.cfg
修改node_db部分path参数
以及database_path
validators_file部分是在/opt/ripple/etc/validators.txt
启动命令：/opt/ripple/bin/rippled --conf /root/rippled.cfg
```