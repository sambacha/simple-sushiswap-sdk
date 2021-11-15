var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrorCodes } from '../../common/errors/error-codes';
import { SushiswapError } from '../../common/errors/sushiswap-error';
import { isAddress } from '../../common/utils/is-address';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from '../token/tokens.factory';
import { SushiswapPairSettings } from './models/sushiswap-pair-settings';
import { SushiswapPairFactory } from './sushiswap-pair.factory';
export class SushiswapPair {
    constructor(_sushiswapPairContext) {
        this._sushiswapPairContext = _sushiswapPairContext;
        if (!this._sushiswapPairContext.fromTokenContractAddress) {
            throw new SushiswapError('Must have a `fromTokenContractAddress` on the context', ErrorCodes.fromTokenContractAddressRequired);
        }
        if (!isAddress(this._sushiswapPairContext.fromTokenContractAddress)) {
            throw new SushiswapError('`fromTokenContractAddress` is not a valid contract address', ErrorCodes.fromTokenContractAddressNotValid);
        }
        if (!this._sushiswapPairContext.toTokenContractAddress) {
            throw new SushiswapError('Must have a `toTokenContractAddress` on the context', ErrorCodes.toTokenContractAddressRequired);
        }
        if (!isAddress(this._sushiswapPairContext.toTokenContractAddress)) {
            throw new SushiswapError('`toTokenContractAddress` is not a valid contract address', ErrorCodes.toTokenContractAddressNotValid);
        }
        if (!this._sushiswapPairContext.ethereumAddress) {
            throw new SushiswapError('Must have a `ethereumAddress` on the context', ErrorCodes.ethereumAddressRequired);
        }
        if (!isAddress(this._sushiswapPairContext.ethereumAddress)) {
            throw new SushiswapError('`ethereumAddress` is not a valid address', ErrorCodes.ethereumAddressNotValid);
        }
        const chainId = this._sushiswapPairContext
            .chainId;
        const providerUrl = (this._sushiswapPairContext).providerUrl;
        if (providerUrl && chainId) {
            this._ethersProvider = new EthersProvider(chainId, providerUrl);
            return;
        }
        if (chainId) {
            this._ethersProvider = new EthersProvider(chainId);
            return;
        }
        throw new SushiswapError('You must have a chainId on the context.', ErrorCodes.youMustSupplyAChainId);
    }
    /**
     * Create factory to be able to call methods on the 2 tokens
     */
    createFactory() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokensFactory = new TokensFactory(this._ethersProvider);
            const tokens = yield tokensFactory.getTokens([
                this._sushiswapPairContext.fromTokenContractAddress,
                this._sushiswapPairContext.toTokenContractAddress,
            ]);
            const sushiswapFactoryContext = {
                fromToken: tokens.find((t) => t.contractAddress ===
                    this._sushiswapPairContext.fromTokenContractAddress),
                toToken: tokens.find((t) => t.contractAddress ===
                    this._sushiswapPairContext.toTokenContractAddress),
                ethereumAddress: this._sushiswapPairContext.ethereumAddress,
                settings: this._sushiswapPairContext.settings || new SushiswapPairSettings(),
                ethersProvider: this._ethersProvider,
            };
            return new SushiswapPairFactory(sushiswapFactoryContext);
        });
    }
}
