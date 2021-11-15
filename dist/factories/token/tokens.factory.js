var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Multicall } from 'ethereum-multicall';
import { ContractContext } from '../../common/contract-context';
import { ErrorCodes } from '../../common/errors/error-codes';
import { SushiswapError } from '../../common/errors/sushiswap-error';
export class TokensFactory {
    constructor(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._multicall = new Multicall({
            ethersProvider: this._ethersProvider.provider,
        });
    }
    /**
     * Get the tokens details
     */
    getTokens(tokenContractAddresses) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SYMBOL = 0;
                const DECIMALS = 1;
                const NAME = 2;
                const contractCallContexts = [];
                for (let i = 0; i < tokenContractAddresses.length; i++) {
                    const contractCallContext = {
                        reference: `token${i}`,
                        contractAddress: tokenContractAddresses[i],
                        abi: ContractContext.erc20Abi,
                        calls: [
                            {
                                reference: `symbol`,
                                methodName: 'symbol',
                                methodParameters: [],
                            },
                            {
                                reference: `decimals`,
                                methodName: 'decimals',
                                methodParameters: [],
                            },
                            {
                                reference: `name`,
                                methodName: 'name',
                                methodParameters: [],
                            },
                        ],
                    };
                    contractCallContexts.push(contractCallContext);
                }
                const contractCallResults = yield this._multicall.call(contractCallContexts);
                const tokens = [];
                for (const result in contractCallResults.results) {
                    const tokenInfo = contractCallResults.results[result];
                    tokens.push({
                        chainId: this._ethersProvider.network().chainId,
                        contractAddress: tokenInfo.originalContractCallContext.contractAddress,
                        symbol: tokenInfo.callsReturnContext[SYMBOL].returnValues[0],
                        decimals: tokenInfo.callsReturnContext[DECIMALS].returnValues[0],
                        name: tokenInfo.callsReturnContext[NAME].returnValues[0],
                    });
                }
                return tokens;
            }
            catch (error) {
                throw new SushiswapError('invalid from or to contract tokens', ErrorCodes.invalidFromOrToContractToken);
            }
        });
    }
}
