# BizManager4000
## Quick start
```bash
git clone https://github.com/gioeleminardi/BizManager4000.git
cd BizManager4000
openssl req -x509 -newkey rsa:2048 -keyout secure/key.pem -out secure/cert.pem -days 365
npm start
```

## Init test data
* Create test data `http://localhost:3000/api/setup`
* Clean all data `http://localhost:3000/api/reset`


## Credits
* Gioele Minardi <gioelem3@gmail.com>
