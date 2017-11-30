# BizManager4000
## Quick start
```bash
git clone https://github.com/gioeleminardi/BizManager4000.git
cd BizManager4000
openssl req -x509 -newkey rsa:2048 -keyout secure/key.pem -out secure/cert.pem -days 365
```
Create `.env` file and write in it:
```
PORT=<YOUR PORT>
DATABASE=<MONGODB URI>
SECRET=<JWT SECRET KEY>
CERT_PASSPHRASE=<TLS CERT PASSPHRASE>
JWT_TOKEN_EXPIRE_TIME=<JWT EXPIRE TIME>
```
And then run
```bash
npm i
npm start
```

## Init test data
* Create test data `http://localhost:3000/api/setup`
* Clean all data `http://localhost:3000/api/reset`