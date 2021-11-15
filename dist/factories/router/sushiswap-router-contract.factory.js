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
export class SushiswapRouterContractFactory {
    constructor(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._sushiswapRouterContract = this._ethersProvider.getContract(JSON.stringify(ContractContext.routerAbi), ContractContext.routerAddress);
    }
    addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('addLiquidity', [
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline,
        ]);
    }
    addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('addLiquidityETH', [token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline]);
    }
    factory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._sushiswapRouterContract.factory();
        });
    }
    getAmountsOut(amountIn, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const amounts = yield this._sushiswapRouterContract.getAmountsOut(amountIn, path);
            return amounts.map((c) => c.toHexString());
        });
    }
    quote(amountA, reserveA, reserveB) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._sushiswapRouterContract.quote(amountA, reserveA, reserveB)).toHexString();
        });
    }
    removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('removeLiquidity', [tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline]);
    }
    removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('removeLiquidity', [token, liquidity, amountTokenMin, amountETHMin, to, deadline]);
    }
    removeLiquidityETHSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('removeLiquidityETHSupportingFeeOnTransferTokens', [token, liquidity, amountTokenMin, amountETHMin, to, deadline]);
    }
    removeLiquidityETHWithPermit(token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('removeLiquidityETHWithPermit', [
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to,
            deadline,
            approveMax,
            v,
            r,
            s,
        ]);
    }
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('removeLiquidityETHWithPermitSupportingFeeOnTransferTokens', [
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to,
            deadline,
            approveMax,
            v,
            r,
            s,
        ]);
    }
    removeLiquidityWithPermit(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline, approveMax, v, r, s) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('removeLiquidityWithPermit', [
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline,
            approveMax,
            v,
            r,
            s,
        ]);
    }
    swapExactETHForTokens(amountOutMin, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapExactETHForTokens', [amountOutMin, path, to, deadline]);
    }
    swapETHForExactTokens(amountOut, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapETHForExactTokens', [amountOut, path, to, deadline]);
    }
    swapExactETHForTokensSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapExactETHForTokensSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline]);
    }
    swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapExactTokensForETH', [amountIn, amountOutMin, path, to, deadline]);
    }
    swapTokensForExactETH(amountOut, amountInMax, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapTokensForExactETH', [amountOut, amountInMax, path, to, deadline]);
    }
    swapExactTokensForETHSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapExactTokensForETHSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline]);
    }
    swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapExactTokensForTokens', [amountIn, amountOutMin, path, to, deadline]);
    }
    swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapTokensForExactTokens', [amountOut, amountInMax, path, to, deadline]);
    }
    swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline) {
        return this._sushiswapRouterContract.interface.encodeFunctionData('swapExactTokensForTokensSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline]);
    }
}
