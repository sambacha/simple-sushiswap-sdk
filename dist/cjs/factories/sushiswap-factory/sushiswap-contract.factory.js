"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapContractFactory = void 0;
const contract_context_1 = require("../../common/contract-context");
class SushiswapContractFactory {
    constructor(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._sushiswapFactoryContract = this._ethersProvider.getContract(JSON.stringify(contract_context_1.ContractContext.factoryAbi), contract_context_1.ContractContext.factoryAddress);
    }
    async allPairs(parameter0) {
        return await this._sushiswapFactoryContract.allPairs(parameter0);
    }
    async allPairsLength() {
        return (await this._sushiswapFactoryContract.allPairsLength()).toHexString();
    }
    createPair(tokenA, tokenB) {
        return this._sushiswapFactoryContract.interface.encodeFunctionData('createPair', [tokenA, tokenB]);
    }
    async getPair(token0, token1) {
        return await this._sushiswapFactoryContract.getPair(token0, token1);
    }
    async feeTo() {
        return await this._sushiswapFactoryContract.feeTo();
    }
    async feeToSetter() {
        return await this._sushiswapFactoryContract.feeToSetter();
    }
    async setFeeTo(_feeTo) {
        return this._sushiswapFactoryContract.interface.encodeFunctionData('setFeeTo', [_feeTo]);
    }
    async setFeeToSetter(_feeToSetter) {
        return this._sushiswapFactoryContract.interface.encodeFunctionData('setFeeToSetter', [_feeToSetter]);
    }
}
exports.SushiswapContractFactory = SushiswapContractFactory;
