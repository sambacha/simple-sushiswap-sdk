import { ETH, EthersProvider, TradeDirection } from '../index';

import { ChainId } from '../enums/chain-id';
import { SushiswapPair } from '../factories/pair/sushiswap-pair';
import { SushiswapPairSettings } from '../factories/pair/models/sushiswap-pair-settings';
import { SushiswapVersion } from '../enums/sushiswap-version';

// WBTC - 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
// FUN - 0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b
// REP - 0x1985365e9f78359a9B6AD760e32412f4a445E862
// WETH - 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
// UNI - 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
// AAVE - 0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9
// GTC - 0xde30da39c46104798bb5aa3fe8b9e0e1f348163f

const routeTest = async () => {
  const fromTokenContractAddress = ETH.MAINNET().contractAddress; //'0xEf0e839Cf88E47be676E72D5a9cB6CED99FaD1CF';
  const toTokenContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'; // 0x1985365e9f78359a9B6AD760e32412f4a445E862
  const ethereumAddress = '0x37c81284caA97131339415687d192BF7D18F0f2a';

  const sushiswapPair = new SushiswapPair({
    fromTokenContractAddress,
    toTokenContractAddress,
    ethereumAddress,
    chainId: ChainId.MAINNET,
    settings: new SushiswapPairSettings({
      // if not supplied it use `0.005` which is 0.5%;
      // all figures
      slippage: 0.005,
      // if not supplied it will use 20 a deadline minutes
      deadlineMinutes: 20,
      disableMultihops: false,
      sushiswapVersions: [SushiswapVersion.v2, SushiswapVersion.v3],
      gasSettings: {
        getGasPrice: async () => '90',
      },
    }),
  });

  const startTime = new Date().getTime();

  const sushiswapPairFactory = await sushiswapPair.createFactory();

  const trade = await sushiswapPairFactory.trade(
    '0.0001',
    TradeDirection.input,
  );

  console.log(new Date().getTime() - startTime);
  console.log(trade);

  // console.log(JSON.stringify(trade, null, 4));
  // console.log(trade);
  // console.log(
  //   trade.allTriedRoutesQuotes.filter(
  //     (c) => c.sushiswapVersion === SushiswapVersion.v3
  //   )
  // );

  const ethers = new EthersProvider({ chainId: ChainId.MAINNET });
  await ethers.provider.estimateGas(trade.transaction);
  // console.log(
  //   'gas',
  //   (await ethers.provider.estimateGas(trade.transaction)).toHexString()
  // );

  // process.stdin.resume();

  // console.log(JSON.stringify(trade));

  // const data = await sushiswapPairFactory.generateApproveMaxAllowanceData();
  // console.log(data);

  // const toToken = sushiswapPairFactory.toToken;
  // console.log(toToken);

  // const fromToken = sushiswapPairFactory.fromToken;
  // console.log(fromToken);

  // const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

  // const tokenFactoryPublic = new TokenFactoryPublic(
  //   fromTokenContractAddress,
  //   ChainId.MAINNET
  // );

  // console.log(
  //   await tokenFactoryPublic.getAllowanceAndBalanceOf(ethereumAddress)
  // );

  // // the contract address for which you are allowing to move tokens on your behalf
  // const spender = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  // // the amount you wish to allow them to move, this example just uses the max
  // // hex. If not each time they do a operation which needs to move tokens then
  // // it will cost them 2 transactions, 1 to approve the allowance then 1 to actually
  // // do the contract call to move the tokens.
  // const value =
  //   '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  // const data = tokenFactoryPublic.generateApproveAllowanceData(spender, value);
  // console.log(data);
};

routeTest();
