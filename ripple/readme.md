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