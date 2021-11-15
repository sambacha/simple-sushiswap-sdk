import { ChainId } from '../../enums/chain-id';
import { TokenFactory } from './token.factory';
export declare class TokenFactoryPublic extends TokenFactory {
    constructor(tokenContractAddress: string, chainId: ChainId, providerUrl?: string | undefined);
}
