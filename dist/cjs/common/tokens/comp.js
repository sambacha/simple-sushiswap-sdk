"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMP = void 0;
const chain_id_1 = require("../../enums/chain-id");
const error_codes_1 = require("../errors/error-codes");
const sushiswap_error_1 = require("../errors/sushiswap-error");
/**
 * COMP token context CHANGE CONTRACT ADDRESS INFO ETC
 */
class COMP {
    static MAINNET() {
        return {
            chainId: chain_id_1.ChainId.MAINNET,
            contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
            decimals: 18,
            symbol: 'COMP',
            name: 'Compound',
        };
    }
    /**
     * Get COMP token info by chain id
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
exports.COMP = COMP;
