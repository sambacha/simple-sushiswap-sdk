import { EthersProvider } from '../../ethers-provider';
import { SushiswapRouterContractFactory } from './sushiswap-router-contract.factory';
export class SushiswapRouterContractFactoryPublic extends SushiswapRouterContractFactory {
    constructor(chainId, providerUrl) {
        super(new EthersProvider(chainId, providerUrl));
    }
}
