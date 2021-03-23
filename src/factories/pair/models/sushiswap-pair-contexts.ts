import { ChainId } from '../../../enums/chain-id';
import { SushiswapPairSettings } from './sushiswap-pair-settings';

interface SushiswapPairContextBase {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  ethereumAddress: string;
  settings?: SushiswapPairSettings | undefined;
}

export interface SushiswapPairContextForChainId
  extends SushiswapPairContextBase {
  chainId: ChainId | number;
}

export interface SushiswapPairContextForProviderUrl
  extends SushiswapPairContextForChainId {
  providerUrl: string;
}
