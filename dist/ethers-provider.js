var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Contract, providers } from 'ethers';
import { ErrorCodes } from './common/errors/error-codes';
import { SushiswapError } from './common/errors/sushiswap-error';
import { ChainNames } from './enums/chain-id';
export class EthersProvider {
    constructor(chainId, providerUrl) {
        if (providerUrl) {
            const chainName = ChainNames.get(chainId);
            if (!chainName) {
                throw new SushiswapError(`Can not find chain name for ${chainId}`, ErrorCodes.canNotFindChainId);
            }
            this._ethersProvider = new providers.StaticJsonRpcProvider(providerUrl, {
                name: chainName,
                chainId,
            });
            return;
        }
        this._ethersProvider = new providers.InfuraProvider(chainId);
    }
    /**
     * Creates a contract instance
     * @param abi The abi
     * @param contractAddress The contract address
     */
    getContract(abi, contractAddress) {
        const contract = new Contract(contractAddress, abi, this._ethersProvider);
        return contract;
    }
    /**
     * Get the network
     */
    network() {
        return this._ethersProvider.network;
    }
    /**
     * Get the ethers provider
     */
    get provider() {
        return this._ethersProvider;
    }
    /**
     * Get eth amount
     * @param ethereumAddress The ethereum address
     */
    balanceOf(ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._ethersProvider.getBalance(ethereumAddress)).toHexString();
        });
    }
}
