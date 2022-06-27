import { ChainId } from '../../enums/chain-id';
/**
 * DAI token context CHANGE CONTRACT ADDRESS INFO ETC
 */
export declare class DAI {
    static MAINNET(): {
        chainId: ChainId;
        contractAddress: string;
        decimals: number;
        symbol: string;
        name: string;
    };
    /**
     * Get DAI token info by chain id
     * @param chainId The chain id
     */
    static token(chainId: ChainId | number): {
        chainId: ChainId;
        contractAddress: string;
        decimals: number;
        symbol: string;
        name: string;
    };
}
