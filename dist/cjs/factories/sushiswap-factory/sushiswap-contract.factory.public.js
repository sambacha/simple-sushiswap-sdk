"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapContractFactoryPublic = void 0;
const ethers_provider_1 = require("../../ethers-provider");
const sushiswap_contract_factory_1 = require("./sushiswap-contract.factory");
class SushiswapContractFactoryPublic extends sushiswap_contract_factory_1.SushiswapContractFactory {
    constructor(chainId, providerUrl) {
        super(new ethers_provider_1.EthersProvider(chainId, providerUrl));
    }
}
exports.SushiswapContractFactoryPublic = SushiswapContractFactoryPublic;
