import { EthersProvider } from '../../ethers-provider';
import { SushiswapContractFactory } from './sushiswap-contract.factory';
export class SushiswapContractFactoryPublic extends SushiswapContractFactory {
    constructor(chainId, providerUrl) {
        super(new EthersProvider(chainId, providerUrl));
    }
}
