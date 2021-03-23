import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { MOCKAAVE } from '../../mocks/aave-token.mock';
import { WETH } from '../tokens';
import { getTradePath } from './trade-path';

describe('getTradePath', () => {
  it('should return `TradePath.ethToErc20`', () => {
    const result = getTradePath(ChainId.MAINNET, WETH.MAINNET(), MOCK1INCH());
    expect(result).toEqual(TradePath.ethToErc20);
  });

  it('should return `TradePath.erc20ToEth`', () => {
    const result = getTradePath(ChainId.MAINNET, MOCK1INCH(), WETH.MAINNET());
    expect(result).toEqual(TradePath.erc20ToEth);
  });

  it('should return `TradePath.erc20ToErc20`', () => {
    const result = getTradePath(ChainId.MAINNET, MOCK1INCH(), MOCKAAVE());
    expect(result).toEqual(TradePath.erc20ToErc20);
  });
});
