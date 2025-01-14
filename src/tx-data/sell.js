import {Buffer} from 'safe-buffer';
import {defineProperties} from 'ethereumjs-util';

class MinterTxDataSell {
    constructor(data) {
        data = data || {};
        // Define Properties
        const fields = [
            {
                name: 'coinToSell',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            },
            {
                name: 'valueToSell',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            },
            {
                name: 'coinToBuy',
                allowZero: true,
                length: 10,
                default: new Buffer([]),
            },
            {
                name: 'minimumValueToBuy',
                length: 32,
                allowZero: true,
                allowLess: true,
                default: new Buffer([]),
            }];

        /**
         * Returns the rlp encoding of the transaction
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        defineProperties(this, fields, data);
    }
}

export default MinterTxDataSell;
