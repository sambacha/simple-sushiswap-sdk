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
export class SushiswapPairContractFactory {
    constructor(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._sushiswapPairFactory = this._ethersProvider.getContract(JSON.stringify(ContractContext.pairAbi), ContractContext.pairAddress);
    }
    allPairs(parameter0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapPairFactory.allPairs(parameter0);
        });
    }
    allPairsLength() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._sushiswapPairFactory.allPairsLength()).toHexString();
        });
    }
    createPair(tokenA, tokenB) {
        return this._sushiswapPairFactory.interface.encodeFunctionData('createPair', [tokenA, tokenB]);
    }
    feeTo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapPairFactory.feeTo();
        });
    }
    feeToSetter() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapPairFactory.feeToSetter();
        });
    }
    getPair(parameter0, parameter1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapPairFactory.getPair(parameter0, parameter1);
        });
    }
    setFeeTo(_feeTo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._sushiswapPairFactory.interface.encodeFunctionData('setFeeTo', [
                _feeTo,
            ]);
        });
    }
    setFeeToSetter(_feeToSetter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._sushiswapPairFactory.interface.encodeFunctionData('setFeeToSetter', [_feeToSetter]);
        });
    }
}
