import { Token } from '../factories/token/models/token';

export function MOCKAAVE(): Token {
  return {
    chainId: 1,
    contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave Token',
  };
}
