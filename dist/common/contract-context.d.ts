import { JsonFragment } from '@ethersproject/abi';
export declare class ContractContext {
    /**
     * The sushiswap router address
     */
    static routerAddress: string;
    /**
     * The sushiswap factory address
     */
    static factoryAddress: string;
    /**
     * The sushiswap pair address
     */
    static pairAddress: string;
    /**
     * sushiswap v2 router
     */
    static routerAbi: JsonFragment[];
    /**
     * sushiswap v2 factory
     */
    static factoryAbi: JsonFragment[];
    /**
     * sushiswap v2 pair
     */
    static pairAbi: JsonFragment[];
    /**
     * ERC20 abi
     */
    static erc20Abi: JsonFragment[];
}
