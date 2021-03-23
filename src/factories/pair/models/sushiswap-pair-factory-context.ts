import { EthersProvider } from '../../../ethers-provider';
import { Token } from '../../token/models/token';
import { SushiswapPairSettings } from './sushiswap-pair-settings';

export interface SushiswapPairFactoryContext {
  fromToken: Token;
  toToken: Token;
  ethereumAddress: string;
  settings: SushiswapPairSettings;
  ethersProvider: EthersProvider;
}
