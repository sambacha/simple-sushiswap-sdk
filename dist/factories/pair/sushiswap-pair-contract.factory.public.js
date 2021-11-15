import { EthersProvider } from '../../ethers-provider';
import { SushiswapPairContractFactory } from './sushiswap-pair-contract.factory';
export class SushiswapPairContractFactoryPublic extends SushiswapPairContractFactory {
    constructor(chainId, providerUrl) {
        super(new EthersProvider(chainId, providerUrl));
    }
}
