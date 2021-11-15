import { TradePath } from '../../enums/trade-path';
import { WETH } from '../tokens/weth';
export function getTradePath(chainId, fromToken, toToken) {
    if (fromToken.contractAddress === WETH.token(chainId).contractAddress) {
        return TradePath.ethToErc20;
    }
    if (toToken.contractAddress === WETH.token(chainId).contractAddress) {
        return TradePath.erc20ToEth;
    }
    return TradePath.erc20ToErc20;
}
