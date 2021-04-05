import { JsonFragment } from '@ethersproject/abi';

export class ContractContext {
  /**
   * The sushiswap router address
   */
  public static routerAddress = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F';

  /**
   * The sushiswap factory address
   */
  public static factoryAddress = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac';

  /**
   * The sushiswap pair address
   */
  public static pairAddress = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac';

  /**
   * sushiswap v2 router
   */
  public static routerAbi: JsonFragment[] = require('../abi/sushiswap-router-v2.json');

  /**
   * sushiswap v2 factory
   */
  public static factoryAbi: JsonFragment[] = require('../abi/sushiswap-factory-v2.json');

  /**
   * sushiswap v2 pair
   */
  public static pairAbi: JsonFragment[] = require('../abi/sushiswap-pair-v2.json');

  /**
   * ERC20 abi
   */
  public static erc20Abi: JsonFragment[] = require('../abi/erc-20-abi.json');
}
