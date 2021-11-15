import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { Token } from '../../factories/token/models/token';
export declare function getTradePath(chainId: ChainId, fromToken: Token, toToken: Token): TradePath;
