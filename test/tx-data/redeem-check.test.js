import {toBuffer} from 'minterjs-util';
import {Buffer} from 'safe-buffer';
import MinterRedeemCheckTxData from '../../src/tx-data/redeem-check';
import decodeToArray from '../decode-to-array';

describe('MinterBuyTxData', () => {
    test('rlp encoded fields', () => {
        const serializedTxData = (new MinterRedeemCheckTxData({
            check: toBuffer('Mcf89f01830f423f8a4d4e5400000000000000888ac7230489e80000b841ada7ad273bef8a1d22f3e314fdfad1e19b90b1fe8dc7eeb30bd1d391e89af8642af029c138c2e379b95d6bc71b26c531ea155d9435e156a3d113a14c912dfebf001ca0781a7b7d781634bcf632579b99d583887ab093dfbd50b65de5c0e5813028a277a071272d8e1be721f5307f40f87daa4ab632781640f18fd424839396442cc7ff17'),
            proof: Buffer.from('7f8b6d3ed18d2fe131bbdc9f9bce3b96724ac354ce2cfb49b4ffc4bd71aabf580a8dfed407a34122e45d290941d855d744a62110fa1c11448078b13d3117bdfc01', 'hex'),
        })).serialize();

        expect(decodeToArray(serializedTxData))
            .toEqual([
                [248, 159, 1, 131, 15, 66, 63, 138, 77, 78, 84, 0, 0, 0, 0, 0, 0, 0, 136, 138, 199, 35, 4, 137, 232, 0, 0, 184, 65, 173, 167, 173, 39, 59, 239, 138, 29, 34, 243, 227, 20, 253, 250, 209, 225, 155, 144, 177, 254, 141, 199, 238, 179, 11, 209, 211, 145, 232, 154, 248, 100, 42, 240, 41, 193, 56, 194, 227, 121, 185, 93, 107, 199, 27, 38, 197, 49, 234, 21, 93, 148, 53, 225, 86, 163, 209, 19, 161, 76, 145, 45, 254, 191, 0, 28, 160, 120, 26, 123, 125, 120, 22, 52, 188, 246, 50, 87, 155, 153, 213, 131, 136, 122, 176, 147, 223, 189, 80, 182, 93, 229, 192, 229, 129, 48, 40, 162, 119, 160, 113, 39, 45, 142, 27, 231, 33, 245, 48, 127, 64, 248, 125, 170, 74, 182, 50, 120, 22, 64, 241, 143, 212, 36, 131, 147, 150, 68, 44, 199, 255, 23],
                [127, 139, 109, 62, 209, 141, 47, 225, 49, 187, 220, 159, 155, 206, 59, 150, 114, 74, 195, 84, 206, 44, 251, 73, 180, 255, 196, 189, 113, 170, 191, 88, 10, 141, 254, 212, 7, 163, 65, 34, 228, 93, 41, 9, 65, 216, 85, 215, 68, 166, 33, 16, 250, 28, 17, 68, 128, 120, 177, 61, 49, 23, 189, 252, 1],
            ]);
    });
});
