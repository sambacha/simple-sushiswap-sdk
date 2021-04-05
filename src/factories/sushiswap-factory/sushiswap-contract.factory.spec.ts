import { isHexString } from 'ethers/lib/utils';
import { ChainId, WETH } from '../..';
import { EthersProvider } from '../../ethers-provider';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { SushiswapContractFactory } from './sushiswap-contract.factory';

describe('SushiswapContractFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);

  const sushiswapContractFactory = new SushiswapContractFactory(ethersProvider);

  it('allPairs', async () => {
    const result = await sushiswapContractFactory.allPairs('0x01');
    expect(result).toEqual('0x06da0fd433C1A5d7a4faa01111c044910A184553');
  });

  it('allPairsLength', async () => {
    const result = await sushiswapContractFactory.allPairsLength();
    expect(isHexString(result)).toEqual(true);
  });

  it('createPair', () => {
    const result = sushiswapContractFactory.createPair(
      MOCK1INCH().contractAddress,
      WETH.MAINNET().contractAddress,
    );
    expect(result).toEqual(
      '0xc9c65396000000000000000000000000111111111117dc0aa78b770fa6a738034120c302000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    );
  });

  it('feeTo', async () => {
    const result = await sushiswapContractFactory.feeTo();
    expect(isHexString(result)).toEqual(true);
  });

  it('feeToSetter', async () => {
    const result = await sushiswapContractFactory.feeToSetter();
    expect(isHexString(result)).toEqual(true);
  });

  it('getPair', async () => {
    const result = await sushiswapContractFactory.getPair(
      WETH.MAINNET().contractAddress,
      MOCK1INCH().contractAddress,
    );
    expect(result).toEqual('0x86f518368E0d49d5916e2BD9EB162E9952b7b04d');
  });

  it('setFeeTo', async () => {
    const result = await sushiswapContractFactory.setFeeTo(
      '0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142',
    );
    expect(result).toEqual(
      '0xf46901ed00000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142',
    );
  });

  it('setFeeToSetter', async () => {
    const result = await sushiswapContractFactory.setFeeToSetter(
      '0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142',
    );
    expect(result).toEqual(
      '0xa2e74af600000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142',
    );
  });
});
