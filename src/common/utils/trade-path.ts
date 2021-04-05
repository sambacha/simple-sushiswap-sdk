import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { Token } from '../../factories/token/models/token';
import { WETH } from '../tokens/weth';

export function getTradePath(
  chainId: ChainId,
  fromToken: Token,
  toToken: Token,
): TradePath {
  if (fromToken.contractAddress === WETH.token(chainId).contractAddress) {
    return TradePath.ethToErc20;
  }

  if (toToken.contractAddress === WETH.token(chainId).contractAddress) {
    return TradePath.erc20ToEth;
  }

  return TradePath.erc20ToErc20;
}
