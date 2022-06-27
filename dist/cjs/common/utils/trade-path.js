"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradePath = void 0;
const trade_path_1 = require("../../enums/trade-path");
const weth_1 = require("../tokens/weth");
function getTradePath(chainId, fromToken, toToken) {
    if (fromToken.contractAddress === weth_1.WETH.token(chainId).contractAddress) {
        return trade_path_1.TradePath.ethToErc20;
    }
    if (toToken.contractAddress === weth_1.WETH.token(chainId).contractAddress) {
        return trade_path_1.TradePath.erc20ToEth;
    }
    return trade_path_1.TradePath.erc20ToErc20;
}
exports.getTradePath = getTradePath;
