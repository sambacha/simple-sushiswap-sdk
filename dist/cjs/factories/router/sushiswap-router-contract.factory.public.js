"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapRouterContractFactoryPublic = void 0;
const ethers_provider_1 = require("../../ethers-provider");
const sushiswap_router_contract_factory_1 = require("./sushiswap-router-contract.factory");
class SushiswapRouterContractFactoryPublic extends sushiswap_router_contract_factory_1.SushiswapRouterContractFactory {
    constructor(chainId, providerUrl) {
        super(new ethers_provider_1.EthersProvider(chainId, providerUrl));
    }
}
exports.SushiswapRouterContractFactoryPublic = SushiswapRouterContractFactoryPublic;
