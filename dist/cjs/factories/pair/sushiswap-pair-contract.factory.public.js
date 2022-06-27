"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapPairContractFactoryPublic = void 0;
const ethers_provider_1 = require("../../ethers-provider");
const sushiswap_pair_contract_factory_1 = require("./sushiswap-pair-contract.factory");
class SushiswapPairContractFactoryPublic extends sushiswap_pair_contract_factory_1.SushiswapPairContractFactory {
    constructor(chainId, providerUrl) {
        super(new ethers_provider_1.EthersProvider(chainId, providerUrl));
    }
}
exports.SushiswapPairContractFactoryPublic = SushiswapPairContractFactoryPublic;
