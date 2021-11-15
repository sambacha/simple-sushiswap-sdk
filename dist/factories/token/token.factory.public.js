import { EthersProvider } from '../../ethers-provider';
import { TokenFactory } from './token.factory';
export class TokenFactoryPublic extends TokenFactory {
    constructor(tokenContractAddress, chainId, providerUrl) {
        super(tokenContractAddress, new EthersProvider(chainId, providerUrl));
    }
}
