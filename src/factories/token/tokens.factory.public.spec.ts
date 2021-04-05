import {
  ChainId,
  ErrorCodes,
  SushiswapError,
  TokensFactoryPublic,
} from '../..';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { MOCKAAVE } from '../../mocks/aave-token.mock';

describe('TokensFactoryPublic', () => {
  const tokensFactoryPublic = new TokensFactoryPublic(ChainId.MAINNET);

  describe('getTokens', () => {
    it('should return both token info', async () => {
      const result = await tokensFactoryPublic.getTokens([
        MOCK1INCH().contractAddress,
        MOCKAAVE().contractAddress,
      ]);
      expect(result[0]).toEqual(MOCK1INCH());
      expect(result[1]).toEqual(MOCKAAVE());
    });

    it('should throw error if 1 of the contract addresses are invalid', async () => {
      await expect(
        tokensFactoryPublic.getTokens([
          '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E722c',
          MOCKAAVE().contractAddress,
        ]),
      ).rejects.toThrowError(
        new SushiswapError(
          'invalid from or to contract tokens',
          ErrorCodes.invalidFromOrToContractToken,
        ),
      );
    });
  });
});
