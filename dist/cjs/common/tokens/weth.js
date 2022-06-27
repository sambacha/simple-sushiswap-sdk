"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WETH = void 0;
const chain_id_1 = require("../../enums/chain-id");
const error_codes_1 = require("../errors/error-codes");
const sushiswap_error_1 = require("../errors/sushiswap-error");
/**
 * WETH token context
 */
class WETH {
    static MAINNET() {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static ROPSTEN() {
        return {
            chainId: chain_id_1.ChainId.ROPSTEN,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static RINKEBY() {
        return {
            chainId: chain_id_1.ChainId.RINKEBY,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static GORLI() {
        return {
            chainId: chain_id_1.ChainId.GÖRLI,
            contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
        };
    }
    static KOVAN() {
        return {
            chainId: chain_id_1.ChainId.KOVAN,
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
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            case chain_id_1.ChainId.ROPSTEN:
                return this.ROPSTEN();
            case chain_id_1.ChainId.RINKEBY:
                return this.RINKEBY();
            case chain_id_1.ChainId.GÖRLI:
                return this.GORLI();
            case chain_id_1.ChainId.KOVAN:
                return this.KOVAN();
            default:
                throw new sushiswap_error_1.SushiswapError(`${chainId} is not allowed`, error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    }
}
exports.WETH = WETH;
