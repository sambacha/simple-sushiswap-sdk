"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapPairFactory = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const rxjs_1 = require("rxjs");
const constants_1 = require("../../common/constants");
const contract_context_1 = require("../../common/contract-context");
const error_codes_1 = require("../../common/errors/error-codes");
const sushiswap_error_1 = require("../../common/errors/sushiswap-error");
const hexlify_1 = require("../../common/utils/hexlify");
const parse_ether_1 = require("../../common/utils/parse-ether");
const to_ethers_big_number_1 = require("../../common/utils/to-ethers-big-number");
const trade_path_1 = require("../../common/utils/trade-path");
const trade_path_2 = require("../../enums/trade-path");
const sushiswap_router_contract_factory_1 = require("../router/sushiswap-router-contract.factory");
const sushiswap_router_factory_1 = require("../router/sushiswap-router.factory");
const token_factory_1 = require("../token/token.factory");
const sushiswap_pair_contract_factory_1 = require("./sushiswap-pair-contract.factory");
class SushiswapPairFactory {
    constructor(_sushiswapPairFactoryContext) {
        this._sushiswapPairFactoryContext = _sushiswapPairFactoryContext;
        this.LIQUIDITY_PROVIDER_FEE = 0.003;
        this._fromTokenFactory = new token_factory_1.TokenFactory(this._sushiswapPairFactoryContext.fromToken.contractAddress, this._sushiswapPairFactoryContext.ethersProvider);
        this._SushiswapRouterContractFactory = new sushiswap_router_contract_factory_1.SushiswapRouterContractFactory(this._sushiswapPairFactoryContext.ethersProvider);
        this._sushiswapPairFactory = new sushiswap_pair_contract_factory_1.SushiswapPairContractFactory(this._sushiswapPairFactoryContext.ethersProvider);
        this._SushiswapRouterFactory = new sushiswap_router_factory_1.SushiswapRouterFactory(this._sushiswapPairFactoryContext.fromToken, this._sushiswapPairFactoryContext.toToken, this._sushiswapPairFactoryContext.settings.disableMultihops, this._sushiswapPairFactoryContext.ethersProvider);
        this._quoteChanged$ = new rxjs_1.Subject();
    }
    /**
     * The to token
     */
    get toToken() {
        return this._sushiswapPairFactoryContext.toToken;
    }
    /**
     * The from token
     */
    get fromToken() {
        return this._sushiswapPairFactoryContext.fromToken;
    }
    /**
     * Get the contract calls
     */
    get contractCalls() {
        return this._sushiswapPairFactory;
    }
    /**
     * Execute the trade path
     * @param amount The amount
     */
    async executeTradePath(amount) {
        switch (this.tradePath()) {
            case trade_path_2.TradePath.erc20ToEth:
                return await this.getTokenTradeAmountErc20ToEth(amount);
            case trade_path_2.TradePath.ethToErc20:
                return await this.getTokenTradeAmountEthToErc20(amount);
            case trade_path_2.TradePath.erc20ToErc20:
                return await this.getTokenTradeAmountErc20ToErc20(amount);
            default:
                throw new sushiswap_error_1.SushiswapError(`${this.tradePath()} is not defined`, error_codes_1.ErrorCodes.tradePathIsNotSupported);
        }
    }
    /**
     * Destroy the trade instance watchers + subscriptions
     */
    destroy() {
        for (let i = 0; i < this._quoteChanged$.observers.length; i++) {
            this._quoteChanged$.observers[i].complete();
        }
        if (this._quoteChangeTimeout) {
            clearTimeout(this._quoteChangeTimeout);
        }
    }
    /**
     * Generate trade - this will return amount but you still need to send the transaction
     * if you want it to be executed on the blockchain
     * @amount The amount you want to swap, this is the FROM token amount.
     */
    async trade(amount) {
        this.destroy();
        const tradeContext = await this.executeTradePath(new bignumber_js_1.default(amount));
        this.watchTradePrice(tradeContext);
        return tradeContext;
    }
    /**
     * Route getter
     */
    get _routes() {
        return this._SushiswapRouterFactory;
    }
    /**
     * Find the best route rate out of all the route quotes
     * @param amountToTrade The amount to trade
     */
    async findBestRoute(amountToTrade) {
        return await this._routes.findBestRoute(new bignumber_js_1.default(amountToTrade));
    }
    /**
     * Find the best route rate out of all the route quotes
     * @param amountToTrade The amount to trade
     */
    async findAllPossibleRoutesWithQuote(amountToTrade) {
        return await this._routes.getAllPossibleRoutesWithQuotes(new bignumber_js_1.default(amountToTrade));
    }
    /**
     * Find all possible routes
     */
    async findAllPossibleRoutes() {
        return await this._routes.getAllPossibleRoutes();
    }
    /**
     * Has got enough allowance to do the trade
     * @param amount The amount you want to swap
     */
    async hasGotEnoughAllowance(amount) {
        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
            return true;
        }
        const allowance = await this.allowance();
        return this._hasGotEnoughAllowance(amount, allowance);
    }
    /**
     * Has got enough allowance to do the trade
     * @param amount The amount you want to swap
     */
    _hasGotEnoughAllowance(amount, allowance) {
        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
            return true;
        }
        const bigNumberAllowance = new bignumber_js_1.default(allowance).shiftedBy(this.fromToken.decimals * -1);
        if (new bignumber_js_1.default(amount).isGreaterThan(bigNumberAllowance)) {
            return false;
        }
        return true;
    }
    /**
     * Has got enough balance to do the trade (erc20 check only)
     * @param amount The amount you want to swap
     */
    hasGotEnoughBalanceErc20(amount, balance) {
        const bigNumberBalance = new bignumber_js_1.default(balance).shiftedBy(this.fromToken.decimals * -1);
        if (new bignumber_js_1.default(amount).isGreaterThan(bigNumberBalance)) {
            return {
                hasEnough: false,
                balance: bigNumberBalance.toFixed(),
            };
        }
        return {
            hasEnough: true,
            balance: bigNumberBalance.toFixed(),
        };
    }
    /**
     * Has got enough balance to do the trade (eth check only)
     * @param amount The amount you want to swap
     */
    async hasGotEnoughBalanceEth(amount) {
        const balance = await this._sushiswapPairFactoryContext.ethersProvider.balanceOf(this._sushiswapPairFactoryContext.ethereumAddress);
        const bigNumberBalance = new bignumber_js_1.default(balance).shiftedBy(constants_1.Constants.ETH_MAX_DECIMALS * -1);
        if (new bignumber_js_1.default(amount).isGreaterThan(bigNumberBalance)) {
            return {
                hasEnough: false,
                balance: bigNumberBalance.toFixed(),
            };
        }
        return {
            hasEnough: true,
            balance: bigNumberBalance.toFixed(),
        };
    }
    /**
     * Get the allowance and balance for the from token (erc20 > blah) only
     */
    async getAllowanceAndBalanceOfForFromToken() {
        return await this._fromTokenFactory.getAllowanceAndBalanceOf(this._sushiswapPairFactoryContext.ethereumAddress);
    }
    /**
     * Get the allowance for the amount which can be moved from the `fromToken`
     * on the users behalf. Only valid when the `fromToken` is a ERC20 token.
     */
    async allowance() {
        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
            return '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        }
        const allowance = await this._fromTokenFactory.allowance(this._sushiswapPairFactoryContext.ethereumAddress);
        return allowance;
    }
    /**
     * Generate the from token approve data max allowance to move the tokens.
     * This will return the data for you to send as a transaction
     */
    async generateApproveMaxAllowanceData() {
        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
            throw new sushiswap_error_1.SushiswapError('You do not need to generate approve sushiswap allowance when doing eth > erc20', error_codes_1.ErrorCodes.generateApproveMaxAllowanceDataNotAllowed);
        }
        const data = this._fromTokenFactory.generateApproveAllowanceData(contract_context_1.ContractContext.routerAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
        return {
            to: this.fromToken.contractAddress,
            from: this._sushiswapPairFactoryContext.ethereumAddress,
            data,
            value: constants_1.Constants.EMPTY_HEX_STRING,
        };
    }
    /**
     * Get the token trade amount for erc20 > eth
     * @param amount The amount
     */
    async getTokenTradeAmountErc20ToEth(amount) {
        return await this.findBestPriceAndPathErc20ToEth(amount);
    }
    /**
     * Gets how much token they will get for their trade minus all fees
     * @param ethAmount The eth amount
     */
    async getTokenTradeAmountEthToErc20(ethAmount) {
        return await this.findBestPriceAndPathEthToErc20(ethAmount);
    }
    /**
     * Get the token trade amount for erc20 > erc20
     * @param amount The amount
     */
    async getTokenTradeAmountErc20ToErc20(amount) {
        return await this.findBestPriceAndPathErc20ToErc20(amount);
    }
    /**
     * finds the best price and path for Erc20ToEth
     * @param amount the erc20Token amount being sent
     */
    async findBestPriceAndPathErc20ToEth(erc20Amount) {
        const bestRouteQuotes = await this._routes.findBestRoute(erc20Amount);
        const bestRouteQuote = bestRouteQuotes.bestRouteQuote;
        const convertQuoteWithSlippage = new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote).minus(new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote)
            .times(this._sushiswapPairFactoryContext.settings.slippage)
            .toFixed(this.fromToken.decimals));
        const tradeExpires = this.generateTradeDeadlineUnixTime();
        const data = this.generateTradeDataErc20ToEth(erc20Amount, convertQuoteWithSlippage, bestRouteQuote.routePathArray, tradeExpires.toString());
        const allowanceAndBalanceOf = await this.getAllowanceAndBalanceOfForFromToken();
        const tradeContext = {
            baseConvertRequest: erc20Amount.toFixed(),
            minAmountConvertQuote: convertQuoteWithSlippage.toFixed(this.toToken.decimals),
            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
            liquidityProviderFee: erc20Amount
                .times(this.LIQUIDITY_PROVIDER_FEE)
                .toFixed(this.fromToken.decimals),
            tradeExpires,
            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
            routeText: bestRouteQuote.routeText,
            routePath: bestRouteQuote.routePathArray,
            hasEnoughAllowance: this._hasGotEnoughAllowance(erc20Amount.toFixed(), allowanceAndBalanceOf.allowance),
            toToken: this.toToken,
            fromToken: this.fromToken,
            fromBalance: this.hasGotEnoughBalanceErc20(erc20Amount.toFixed(), allowanceAndBalanceOf.balanceOf),
            transaction: this.buildUpTransactionErc20(data),
            allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
            quoteChanged$: this._quoteChanged$,
            destroy: () => this.destroy(),
        };
        return tradeContext;
    }
    /**
     * finds the best price and path for Erc20ToErc20
     * @param amount the erc20Token amount being sent
     */
    async findBestPriceAndPathErc20ToErc20(erc20Amount) {
        const bestRouteQuotes = await this._routes.findBestRoute(erc20Amount);
        const bestRouteQuote = bestRouteQuotes.bestRouteQuote;
        const convertQuoteWithSlippage = new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote).minus(new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote)
            .times(this._sushiswapPairFactoryContext.settings.slippage)
            .toFixed(this.fromToken.decimals));
        const tradeExpires = this.generateTradeDeadlineUnixTime();
        const data = this.generateTradeDataErc20ToErc20(erc20Amount, convertQuoteWithSlippage, bestRouteQuote.routePathArray, tradeExpires.toString());
        const allowanceAndBalanceOf = await this.getAllowanceAndBalanceOfForFromToken();
        const tradeContext = {
            baseConvertRequest: erc20Amount.toFixed(),
            minAmountConvertQuote: convertQuoteWithSlippage.toFixed(this.toToken.decimals),
            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
            liquidityProviderFee: erc20Amount
                .times(this.LIQUIDITY_PROVIDER_FEE)
                .toFixed(this.fromToken.decimals),
            tradeExpires,
            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
            routeText: bestRouteQuote.routeText,
            routePath: bestRouteQuote.routePathArray,
            hasEnoughAllowance: this._hasGotEnoughAllowance(erc20Amount.toFixed(), allowanceAndBalanceOf.allowance),
            toToken: this.toToken,
            fromToken: this.fromToken,
            fromBalance: this.hasGotEnoughBalanceErc20(erc20Amount.toFixed(), allowanceAndBalanceOf.balanceOf),
            transaction: this.buildUpTransactionErc20(data),
            allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
            quoteChanged$: this._quoteChanged$,
            destroy: () => this.destroy(),
        };
        return tradeContext;
    }
    /**
     * Find the best price and route path to take (will round down the slippage)
     * @param ethAmount The eth amount
     */
    async findBestPriceAndPathEthToErc20(ethAmount) {
        const bestRouteQuotes = await this._routes.findBestRoute(ethAmount);
        const bestRouteQuote = bestRouteQuotes.bestRouteQuote;
        const convertQuoteWithSlippage = new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote).minus(new bignumber_js_1.default(bestRouteQuote.expectedConvertQuote)
            .times(this._sushiswapPairFactoryContext.settings.slippage)
            .toFixed(this.toToken.decimals));
        const tradeExpires = this.generateTradeDeadlineUnixTime();
        const data = this.generateTradeDataEthToErc20(convertQuoteWithSlippage, bestRouteQuote.routePathArray, tradeExpires.toString());
        const tradeContext = {
            baseConvertRequest: ethAmount.toFixed(),
            minAmountConvertQuote: convertQuoteWithSlippage.toFixed(this.toToken.decimals),
            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
            liquidityProviderFee: ethAmount
                .times(this.LIQUIDITY_PROVIDER_FEE)
                .toFixed(this.fromToken.decimals),
            tradeExpires,
            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
            routeText: bestRouteQuote.routeText,
            routePath: bestRouteQuote.routePathArray,
            hasEnoughAllowance: true,
            toToken: this.toToken,
            fromToken: this.fromToken,
            fromBalance: await this.hasGotEnoughBalanceEth(ethAmount.toFixed()),
            transaction: this.buildUpTransactionEth(ethAmount, data),
            allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
            quoteChanged$: this._quoteChanged$,
            destroy: () => this.destroy(),
        };
        return tradeContext;
    }
    /**
     * Generate trade data eth > erc20
     * @param tokenAmount The token amount
     * @param routePath The route path
     * @param deadline The deadline it expiries unix time
     */
    generateTradeDataEthToErc20(tokenAmount, routePathArray, deadline) {
        // sushiswap adds extra digits on even if the token is say 8 digits long
        const convertedMinTokens = tokenAmount
            .shiftedBy(this.toToken.decimals)
            .decimalPlaces(0);
        const hex = (0, hexlify_1.hexlify)(convertedMinTokens);
        return this._SushiswapRouterContractFactory.swapExactETHForTokens(hex, routePathArray, this._sushiswapPairFactoryContext.ethereumAddress, deadline);
    }
    /**
     * Generate trade amount erc20 > eth
     * @param tokenAmount The token amount
     * @param ethAmountOutMin The min eth in eth not wei this converts it
     * @param routePathArray The route path array
     * @param deadline The deadline it expiries unix time
     */
    generateTradeDataErc20ToEth(tokenAmount, ethAmountOutMin, routePathArray, deadline) {
        // sushiswap adds extra digits on even if the token is say 8 digits long
        const amountIn = tokenAmount
            .shiftedBy(this.fromToken.decimals)
            .decimalPlaces(0);
        const ethAmountOutWei = (0, hexlify_1.hexlify)((0, parse_ether_1.parseEther)(ethAmountOutMin));
        return this._SushiswapRouterContractFactory.swapExactTokensForETH((0, hexlify_1.hexlify)(amountIn), ethAmountOutWei, routePathArray, this._sushiswapPairFactoryContext.ethereumAddress, deadline);
    }
    /**
     * Generate trade amount erc20 > erc20
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param routePathArray The route path array
     * @param deadline The deadline it expiries unix time
     */
    generateTradeDataErc20ToErc20(tokenAmount, tokenAmountMin, routePathArray, deadline) {
        // sushiswap adds extra digits on even if the token is say 8 digits long
        const amountIn = tokenAmount
            .shiftedBy(this.fromToken.decimals)
            .decimalPlaces(0);
        const amountMin = tokenAmountMin
            .shiftedBy(this.toToken.decimals)
            .decimalPlaces(0);
        return this._SushiswapRouterContractFactory.swapExactTokensForTokens((0, hexlify_1.hexlify)(amountIn), (0, hexlify_1.hexlify)(amountMin), routePathArray, this._sushiswapPairFactoryContext.ethereumAddress, deadline);
    }
    /**
     * Build up a transaction for erc20 from
     * @param data The data
     */
    buildUpTransactionErc20(data) {
        return {
            to: contract_context_1.ContractContext.routerAddress,
            from: this._sushiswapPairFactoryContext.ethereumAddress,
            data,
            value: constants_1.Constants.EMPTY_HEX_STRING,
        };
    }
    /**
     * Build up a transaction for eth from
     * @param ethValue The eth value
     * @param data The data
     */
    buildUpTransactionEth(ethValue, data) {
        return {
            to: contract_context_1.ContractContext.routerAddress,
            from: this._sushiswapPairFactoryContext.ethereumAddress,
            data,
            value: (0, to_ethers_big_number_1.toEthersBigNumber)((0, parse_ether_1.parseEther)(ethValue)).toHexString(),
        };
    }
    /**
     * Get the trade path
     */
    tradePath() {
        const network = this._sushiswapPairFactoryContext.ethersProvider.network();
        return (0, trade_path_1.getTradePath)(network.chainId, this.fromToken, this.toToken);
    }
    /**
     * Generates the trade datetime unix time
     */
    generateTradeDeadlineUnixTime() {
        const now = new Date();
        const expiryDate = new Date(now.getTime() +
            this._sushiswapPairFactoryContext.settings.deadlineMinutes * 60000);
        return (expiryDate.getTime() / 1e3) | 0;
    }
    /**
     * Watch trade price move automatically emitting the stream if it changes
     * @param tradeContext The old trade context aka the current one
     */
    async watchTradePrice(tradeContext) {
        this._quoteChangeTimeout = setTimeout(async () => {
            if (this._quoteChanged$.observers.length > 0) {
                const trade = await this.executeTradePath(new bignumber_js_1.default(tradeContext.baseConvertRequest));
                if (!new bignumber_js_1.default(trade.expectedConvertQuote).eq(tradeContext.expectedConvertQuote) ||
                    trade.routeText !== tradeContext.routeText) {
                    this._quoteChanged$.next(trade);
                    this.watchTradePrice(trade);
                    return;
                }
                // it has expired send another one to them
                if (tradeContext.tradeExpires > this.generateTradeDeadlineUnixTime()) {
                    this._quoteChanged$.next(trade);
                    this.watchTradePrice(trade);
                    return;
                }
                this.watchTradePrice(tradeContext);
            }
            else {
                this.watchTradePrice(tradeContext);
            }
            // maybe make config???
            // query new prices every 10 seconds
        }, 10000);
    }
}
exports.SushiswapPairFactory = SushiswapPairFactory;
