"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USDT = void 0;
const chain_id_1 = require("../../enums/chain-id");
const error_codes_1 = require("../errors/error-codes");
const sushiswap_error_1 = require("../errors/sushiswap-error");
/**
 * USDT token context CHANGE CONTRACT ADDRESS INFO ETC
 */
class USDT {
    static MAINNET() {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 18,
            symbol: 'USDT',
            name: 'Tether USD',
        };
    }
    /**
     * Get USDT token info by chain id
     * @param chainId The chain id
     */
    static token(chainId) {
        switch (chainId) {
            case chain_id_1.ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new sushiswap_error_1.SushiswapError(`${chainId} is not allowed`, error_codes_1.ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    }
}
exports.USDT = USDT;
