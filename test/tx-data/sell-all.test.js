import {Buffer} from 'safe-buffer';
import {MinterTxDataSellAll, formatCoin} from '~/src';
import decodeToArray from '../decode-to-array';

describe('MinterTxDataSellAll', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterTxDataSellAll({
            coinToSell: formatCoin('MNT'),
            coinToBuy: formatCoin('BELTCOIN'),
            minimumValueToBuy: 5,
        })).serialize();

        expect(serializedTxData)
            .toEqual(Buffer.from([215, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 138, 66, 69, 76, 84, 67, 79, 73, 78, 0, 0, 5]));

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [77, 78, 84, 0, 0, 0, 0, 0, 0, 0],
                [66, 69, 76, 84, 67, 79, 73, 78, 0, 0],
                [5],
            ]);
    });
});
