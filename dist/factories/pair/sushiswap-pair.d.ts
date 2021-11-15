import { SushiswapPairContextForChainId, SushiswapPairContextForProviderUrl } from './models/sushiswap-pair-contexts';
import { SushiswapPairFactory } from './sushiswap-pair.factory';
export declare class SushiswapPair {
    private _sushiswapPairContext;
    private _ethersProvider;
    constructor(_sushiswapPairContext: SushiswapPairContextForChainId | SushiswapPairContextForProviderUrl);
    /**
     * Create factory to be able to call methods on the 2 tokens
     */
    createFactory(): Promise<SushiswapPairFactory>;
}
