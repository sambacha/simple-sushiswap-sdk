import { ChainId } from '../../enums/chain-id';
import { Token } from '../../factories/token/models/token';
/**
 * WETH token context
 */
export declare class WETH {
    static MAINNET(): Token;
    static ROPSTEN(): {
        chainId: ChainId;
        contractAddress: string;
        decimals: number;
        symbol: string;
        name: string;
    };
    static RINKEBY(): {
        chainId: ChainId;
        contractAddress: string;
        decimals: number;
        symbol: string;
        name: string;
    };
    static GORLI(): {
        chainId: ChainId;
        contractAddress: string;
        decimals: number;
        symbol: string;
        name: string;
    };
    static KOVAN(): {
        chainId: ChainId;
        contractAddress: string;
        decimals: number;
        symbol: string;
        name: string;
    };
    /**
     * Get WETH token info by chain id
     * @param chainId The chain id
     */
    static token(chainId: ChainId | number): Token;
}
