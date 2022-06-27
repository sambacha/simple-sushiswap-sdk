"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapPair = void 0;
const error_codes_1 = require("../../common/errors/error-codes");
const sushiswap_error_1 = require("../../common/errors/sushiswap-error");
const is_address_1 = require("../../common/utils/is-address");
const ethers_provider_1 = require("../../ethers-provider");
const tokens_factory_1 = require("../token/tokens.factory");
const sushiswap_pair_settings_1 = require("./models/sushiswap-pair-settings");
const sushiswap_pair_factory_1 = require("./sushiswap-pair.factory");
class SushiswapPair {
    constructor(_sushiswapPairContext) {
        this._sushiswapPairContext = _sushiswapPairContext;
        if (!this._sushiswapPairContext.fromTokenContractAddress) {
            throw new sushiswap_error_1.SushiswapError('Must have a `fromTokenContractAddress` on the context', error_codes_1.ErrorCodes.fromTokenContractAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._sushiswapPairContext.fromTokenContractAddress)) {
            throw new sushiswap_error_1.SushiswapError('`fromTokenContractAddress` is not a valid contract address', error_codes_1.ErrorCodes.fromTokenContractAddressNotValid);
        }
        if (!this._sushiswapPairContext.toTokenContractAddress) {
            throw new sushiswap_error_1.SushiswapError('Must have a `toTokenContractAddress` on the context', error_codes_1.ErrorCodes.toTokenContractAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._sushiswapPairContext.toTokenContractAddress)) {
            throw new sushiswap_error_1.SushiswapError('`toTokenContractAddress` is not a valid contract address', error_codes_1.ErrorCodes.toTokenContractAddressNotValid);
        }
        if (!this._sushiswapPairContext.ethereumAddress) {
            throw new sushiswap_error_1.SushiswapError('Must have a `ethereumAddress` on the context', error_codes_1.ErrorCodes.ethereumAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._sushiswapPairContext.ethereumAddress)) {
            throw new sushiswap_error_1.SushiswapError('`ethereumAddress` is not a valid address', error_codes_1.ErrorCodes.ethereumAddressNotValid);
        }
        const chainId = this._sushiswapPairContext
            .chainId;
        const providerUrl = (this._sushiswapPairContext).providerUrl;
        if (providerUrl && chainId) {
            this._ethersProvider = new ethers_provider_1.EthersProvider(chainId, providerUrl);
            return;
        }
        if (chainId) {
            this._ethersProvider = new ethers_provider_1.EthersProvider(chainId);
            return;
        }
        throw new sushiswap_error_1.SushiswapError('You must have a chainId on the context.', error_codes_1.ErrorCodes.youMustSupplyAChainId);
    }
    /**
     * Create factory to be able to call methods on the 2 tokens
     */
    async createFactory() {
        const tokensFactory = new tokens_factory_1.TokensFactory(this._ethersProvider);
        const tokens = await tokensFactory.getTokens([
            this._sushiswapPairContext.fromTokenContractAddress,
            this._sushiswapPairContext.toTokenContractAddress,
        ]);
        const sushiswapFactoryContext = {
            fromToken: tokens.find((t) => t.contractAddress ===
                this._sushiswapPairContext.fromTokenContractAddress),
            toToken: tokens.find((t) => t.contractAddress ===
                this._sushiswapPairContext.toTokenContractAddress),
            ethereumAddress: this._sushiswapPairContext.ethereumAddress,
            settings: this._sushiswapPairContext.settings || new sushiswap_pair_settings_1.SushiswapPairSettings(),
            ethersProvider: this._ethersProvider,
        };
        return new sushiswap_pair_factory_1.SushiswapPairFactory(sushiswapFactoryContext);
    }
}
exports.SushiswapPair = SushiswapPair;
