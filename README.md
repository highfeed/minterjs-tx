# minterjs-tx

[![NPM Package](https://img.shields.io/npm/v/minterjs-tx.svg?style=flat-square)](https://www.npmjs.org/package/minterjs-tx)
[![Build Status](https://img.shields.io/travis/com/MinterTeam/minterjs-tx/master.svg?style=flat-square)](https://travis-ci.com/MinterTeam/minterjs-tx)
[![Coverage Status](https://img.shields.io/coveralls/github/MinterTeam/minterjs-tx/master.svg?style=flat-square)](https://coveralls.io/github/MinterTeam/minterjs-tx?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MinterTeam/minterjs-tx/blob/master/LICENSE)

A simple module for creating, manipulating and signing Minter transactions.

It is complemented by the following packages:
- [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) complete JS solution to work with Minter
- [minterjs-wallet](https://github.com/MinterTeam/minterjs-wallet) to create wallet
- [minterjs-util](https://github.com/MinterTeam/minterjs-util) utility functions

## Install

`npm install minterjs-tx`

## Usage

### Full example

[example](https://github.com/MinterTeam/minterjs-tx/blob/master/examples/transaction.js)

```javascript
import MinterTx from 'minterjs-tx';
import MinterSendTxData from 'minterjs-tx/src/data/send';
import {TX_TYPE_SEND} from 'minterjs-tx/src/tx-types';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterSendTxData({
    to: '0x0000000000000000000000000000000000000000',
    coin: formatCoin('BIP'),
    value: `0x01`,
});
const txParams = {
    nonce: '0x00',
    gasPrice: '0x01',
    gasCoin: formatCoin('BIP'), 
    type: TX_TYPE_SEND,
    data: txData.serialize(),
};

const tx = new MinterTx(txParams);

const privateKey = Buffer.from('5fa3a8b186f6cc2d748ee2d8c0eb7a905a7b73de0f2c34c5e7857c3b46f187da', 'hex');
tx.sign(privateKey);

const serializedTx = tx.serialize();
```


### Initialization
```javascript
import MinterTx from 'minterjs-tx';

const tx = new MinterTx(txParams);
````

### Tx params
All tx params can be passed as Buffer or Hex string

- `nonce` - int, used for prevent transaction reply (count of txs for this private key + 1)
- `gasPrice` - big int, used for managing transaction fees
- `gasCoin` - symbol of a coin to pay fee
- `type` - type of transaction (see below).
- `data` - data of transaction (depends on transaction type, see below).
- `payload` (arbitrary bytes) - arbitrary user-defined bytes, e.g. tx message
- `serviceData` - reserved field.
- ECDSA fields (`r`, `s` and `v`) - digital signature of transaction


### Methods

#### `.sign(privateKey)`
Sign a transaction with a given private key.
`privateKey` - 32 bytes Buffer.

```javascript
tx.sign(privateKey);
```

#### `.verifySignature()`
Determines if the signature is valid.
Returns boolean.

```javascript
const isValid = tx.verifySignature();
```

#### `.validate(stringError)`
Validates the signature.
`stringError` - whether to return a string with a description of why the validation failed.
Return boolean or string with errors.

```javascript
const isValid = tx.validate();
const validationErrors = tx.validate(true);
```

#### `.hash(includeSignature)`
Computes a sha3-256 hash of the serialized tx.
`includeSignature` - whether or not to include the signature, default true.
Returns Buffer.

```javascript
// hash of tx with signature
const hash = tx.hash();
// hash of tx without signature
const hashWithoutSignature = tx.hash(false);
```

#### `.getSenderAddress()`
Returns the sender's address.
Returns Buffer.

```javascript
const address = tx.getSenderAddress();
```

#### `.getSenderPublicKey()`
Returns the sender's public key.
Returns Buffer.

```javascript
const publicKey = tx.getSenderPublicKey();
```


### Tx types
`TX_TYPE_SEND`:              `'0x01'`
`TX_TYPE_SELL_COIN`:         `'0x02'`
`TX_TYPE_SELL_ALL_COIN`:     `'0x03'`
`TX_TYPE_BUY_COIN`:          `'0x04'`
`TX_TYPE_CREATE_COIN`:       `'0x05'`
`TX_TYPE_DECLARE_CANDIDACY`: `'0x06'`
`TX_TYPE_DELEGATE`:          `'0x07'`
`TX_TYPE_UNBOND`:            `'0x08'`
`TX_TYPE_REDEEM_CHECK`:      `'0x09'`
`TX_TYPE_SET_CANDIDATE_ON`:  `'0x0A'`
`TX_TYPE_SET_CANDIDATE_OFF`: `'0x0B'`

### Tx data

#### Send
```javascript
import {toBuffer} from 'minterjs-util';
import MinterSendTxData from 'minterjs-tx/src/tx-data/send';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterSendTxData({
   coin: formatCoin('MNT'),
   to: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   value: 10,
});
```

#### Sell
```javascript
import MinterSellTxData from 'minterjs-tx/src/tx-data/sell';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterSellTxData({
   coin_to_sell: formatCoin('MNT'),
   value_to_sell: 10,
   coin_to_buy: formatCoin('BELTCOIN'),
});
```

#### Sell All
```javascript
import MinterSellAllTxData from 'minterjs-tx/src/tx-data/sell-all';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterSellAllTxData({
   coin_to_sell: formatCoin('MNT'),
   coin_to_buy: formatCoin('BELTCOIN'),
});
```

#### Buy
```javascript
import MinterBuyTxData from 'minterjs-tx/src/tx-data/buy';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterBuyTxData({
     coin_to_buy: formatCoin('MNT'),
     value_to_buy: 10,
     coin_to_sell: formatCoin('BELTCOIN'),
 });
```

#### Create Coin
```javascript
import MinterCreateCoinTxData from 'minterjs-tx/src/tx-data/create-coin';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterCreateCoinTxData({
   name: 'My coin',
   symbol: formatCoin('MYCOIN'),
   initialAmount: 10,
   initialReserve: 50,
   crr: 100,
});
```

#### Declare Candidacy
```javascript
import {toBuffer} from 'minterjs-util';
import MinterDeclareCandidacyTxData from 'minterjs-tx/src/tx-data/declare-candidacy';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterDeclareCandidacyTxData({
   address: toBuffer('Mx7633980c000139dd3bd24a3f54e06474fa941e16'),
   pubkey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
   commission: 10,
   coin: formatCoin('MNT'),
   stake: 1000,
});
```

#### Delegate
```javascript
import {toBuffer} from 'minterjs-util';
import MinterDelegateTxData from 'minterjs-tx/src/tx-data/delegate';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterDelegateTxData({
   pubkey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
   coin: formatCoin('MNT'),
   stake: 1000,
});
```

#### Unbond
```javascript
import {toBuffer} from 'minterjs-util';
import MinterUnbondTxData from 'minterjs-tx/src/tx-data/unbond';
import {formatCoin} from 'minterjs-tx/src/helpers';

const txData = new MinterUnbondTxData({
   pubkey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
   coin: formatCoin('MNT'),
   stake: 1000,
});
```

#### Redeem Check
```javascript
import {toBuffer} from 'minterjs-util';
import {Buffer} from 'safe-buffer';
import MinterRedeemCheckTxData from 'minterjs-tx/src/tx-data/redeem-check';

const txData = new MinterRedeemCheckTxData({
   check: toBuffer('Mcf89f01830f423f8a4d4e5400000000000000888ac7230489e80000b841ada7ad273bef8a1d22f3e314fdfad1e19b90b1fe8dc7eeb30bd1d391e89af8642af029c138c2e379b95d6bc71b26c531ea155d9435e156a3d113a14c912dfebf001ca0781a7b7d781634bcf632579b99d583887ab093dfbd50b65de5c0e5813028a277a071272d8e1be721f5307f40f87daa4ab632781640f18fd424839396442cc7ff17'),
   proof: Buffer.from('7f8b6d3ed18d2fe131bbdc9f9bce3b96724ac354ce2cfb49b4ffc4bd71aabf580a8dfed407a34122e45d290941d855d744a62110fa1c11448078b13d3117bdfc01', 'hex'),
});
```

#### Set Candidate On
```javascript
import {toBuffer} from 'minterjs-util';
import MinterSetCandidateOnTxData from 'minterjs-tx/src/tx-data/set-candidate-on';

const txData = new MinterSetCandidateOnTxData({
   pubkey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
});
```

#### Set Candidate Off
```javascript
import {toBuffer} from 'minterjs-util';
import MinterSetCandidateOffTxData from 'minterjs-tx/src/tx-data/set-candidate-off';

const txData = new MinterSetCandidateOffTxData({
   pubkey: toBuffer('Mpf9e036839a29f7fba2d5394bd489eda927ccb95acc99e506e688e4888082b3a3'),
});
```


## License

MIT License
