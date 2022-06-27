import { ChainId } from '../../enums/chain-id';
import { TokensFactory } from './tokens.factory';
export declare class TokensFactoryPublic extends TokensFactory {
    constructor(chainId: ChainId, providerUrl?: string | undefined);
}
