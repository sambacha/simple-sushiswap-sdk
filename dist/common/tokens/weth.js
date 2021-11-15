import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { SushiswapError } from '../errors/sushiswap-error';
/**
 * WETH token context
 */
export class WETH {
    static MAINNET() {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static ROPSTEN() {
        return {
            chainId: ChainId.ROPSTEN,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static RINKEBY() {
        return {
            chainId: ChainId.RINKEBY,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static GORLI() {
        return {
            chainId: ChainId.GÖRLI,
            contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static KOVAN() {
        return {
            chainId: ChainId.KOVAN,
            contractAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    /**
     * Get WETH token info by chain id
     * @param chainId The chain id
     */
    static token(chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                return this.MAINNET();
            case ChainId.ROPSTEN:
                return this.ROPSTEN();
            case ChainId.RINKEBY:
                return this.RINKEBY();
            case ChainId.GÖRLI:
                return this.GORLI();
            case ChainId.KOVAN:
                return this.KOVAN();
            default:
                throw new SushiswapError(`${chainId} is not allowed`, ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    }
}
