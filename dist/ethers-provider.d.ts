import { ContractInterface, providers } from 'ethers';
import { ChainId } from './enums/chain-id';
export declare class EthersProvider {
    private _ethersProvider;
    constructor(chainId: ChainId, providerUrl?: string | undefined);
    /**
     * Creates a contract instance
     * @param abi The abi
     * @param contractAddress The contract address
     */
    getContract<TGeneratedTypedContext>(abi: ContractInterface, contractAddress: string): TGeneratedTypedContext;
    /**
     * Get the network
     */
    network(): providers.Network;
    /**
     * Get the ethers provider
     */
    get provider(): providers.BaseProvider;
    /**
     * Get eth amount
     * @param ethereumAddress The ethereum address
     */
    balanceOf(ethereumAddress: string): Promise<string>;
}
