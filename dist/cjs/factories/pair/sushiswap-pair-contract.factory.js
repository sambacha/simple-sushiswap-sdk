"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapPairContractFactory = void 0;
const contract_context_1 = require("../../common/contract-context");
class SushiswapPairContractFactory {
    constructor(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._sushiswapPairFactory = this._ethersProvider.getContract(JSON.stringify(contract_context_1.ContractContext.pairAbi), contract_context_1.ContractContext.pairAddress);
    }
    async allPairs(parameter0) {
        return await this._sushiswapPairFactory.allPairs(parameter0);
    }
    async allPairsLength() {
        return (await this._sushiswapPairFactory.allPairsLength()).toHexString();
    }
    createPair(tokenA, tokenB) {
        return this._sushiswapPairFactory.interface.encodeFunctionData('createPair', [tokenA, tokenB]);
    }
    async feeTo() {
        return await this._sushiswapPairFactory.feeTo();
    }
    async feeToSetter() {
        return await this._sushiswapPairFactory.feeToSetter();
    }
    async getPair(parameter0, parameter1) {
        return await this._sushiswapPairFactory.getPair(parameter0, parameter1);
    }
    async setFeeTo(_feeTo) {
        return this._sushiswapPairFactory.interface.encodeFunctionData('setFeeTo', [
            _feeTo,
        ]);
    }
    async setFeeToSetter(_feeToSetter) {
        return this._sushiswapPairFactory.interface.encodeFunctionData('setFeeToSetter', [_feeToSetter]);
    }
}
exports.SushiswapPairContractFactory = SushiswapPairContractFactory;
