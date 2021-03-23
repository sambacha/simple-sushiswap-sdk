import { Token } from '../factories/token/models/token';

export function MOCK1INCH(): Token {
  return {
    chainId: 1,
    contractAddress: '0x111111111117dC0aa78b770fA6A738034120C302',
    decimals: 18,
    symbol: '1INCH',
    name: '1INCH Token',
  };
}
