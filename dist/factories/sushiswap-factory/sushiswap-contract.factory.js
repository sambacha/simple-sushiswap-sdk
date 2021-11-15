var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ContractContext } from '../../common/contract-context';
export class SushiswapContractFactory {
    constructor(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._sushiswapFactoryContract = this._ethersProvider.getContract(JSON.stringify(ContractContext.factoryAbi), ContractContext.factoryAddress);
    }
    allPairs(parameter0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapFactoryContract.allPairs(parameter0);
        });
    }
    allPairsLength() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._sushiswapFactoryContract.allPairsLength()).toHexString();
        });
    }
    createPair(tokenA, tokenB) {
        return this._sushiswapFactoryContract.interface.encodeFunctionData('createPair', [tokenA, tokenB]);
    }
    getPair(token0, token1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapFactoryContract.getPair(token0, token1);
        });
    }
    feeTo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapFactoryContract.feeTo();
        });
    }
    feeToSetter() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapFactoryContract.feeToSetter();
        });
    }
    setFeeTo(_feeTo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._sushiswapFactoryContract.interface.encodeFunctionData('setFeeTo', [_feeTo]);
        });
    }
    setFeeToSetter(_feeToSetter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._sushiswapFactoryContract.interface.encodeFunctionData('setFeeToSetter', [_feeToSetter]);
        });
    }
}
