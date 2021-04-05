import BigNumber from 'bignumber.js';
import { ChainId, ErrorCodes, SushiswapError, WETH } from '../..';
import { EthersProvider } from '../../ethers-provider';
import { MOCK1INCH } from '../../mocks/1inch-token.mock';
import { MOCKAAVE } from '../../mocks/aave-token.mock';
import { SushiswapRouterFactory } from './sushiswap-router.factory';

describe('SushiswapRouterFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);

  describe('erc20 > erc20', () => {
    const fromToken = MOCK1INCH();
    const toToken = MOCKAAVE();

    const sushiswapRouterFactory = new SushiswapRouterFactory(
      fromToken,
      toToken,
      false,
      ethersProvider,
    );

    describe('getAllPossibleRoutes', () => {
      it('should get all possible routes', async () => {
        const result = await sushiswapRouterFactory.getAllPossibleRoutes();
        expect(result.length > 0).toEqual(true);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(true);
      });

      it('should only return direct routes (in this case return nothing as there is no direct route)', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.getAllPossibleRoutes();
        expect(result.length === 0).toEqual(true);
      });
    });

    describe('getAllPossibleRoutesWithQuotes', () => {
      it('should get all possible routes with quote', async () => {
        const result = await sushiswapRouterFactory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1),
        );
        expect(result.length > 0).toEqual(true);
      });

      it('should only return direct routes (in this case return nothing as there is no direct route)', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1),
        );
        expect(result.length === 0).toEqual(true);
      });
    });

    describe('findBestRoute', () => {
      it('should find best route', async () => {
        const result = await sushiswapRouterFactory.findBestRoute(
          new BigNumber(100),
        );
        expect(result.bestRouteQuote.routeText).toEqual('1INCH > WETH > AAVE');
      });

      it('should throw an error as there is no best route with disableMultihops turned on', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        await expect(
          factory.findBestRoute(new BigNumber(100)),
        ).rejects.toThrowError(
          new SushiswapError(
            `No routes found for ${fromToken.contractAddress} > ${toToken.contractAddress}`,
            ErrorCodes.noRoutesFound,
          ),
        );
      });
    });
  });

  describe('erc20 > eth', () => {
    const fromToken = MOCK1INCH();
    const toToken = WETH.MAINNET();

    const sushiswapRouterFactory = new SushiswapRouterFactory(
      fromToken,
      toToken,
      false,
      ethersProvider,
    );

    describe('getAllPossibleRoutes', () => {
      it('should get all possible routes', async () => {
        const result = await sushiswapRouterFactory.getAllPossibleRoutes();
        expect(result.length > 0).toEqual(true);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.getAllPossibleRoutes();
        expect(result.length === 1).toEqual(true);
        expect(result[0][0]).toEqual(fromToken);
        expect(result[0][1]).toEqual(toToken);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(false);
      });
    });

    describe('getAllPossibleRoutesWithQuotes', () => {
      it('should get all possible routes with quote', async () => {
        const result = await sushiswapRouterFactory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1),
        );
        expect(result.length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1),
        );
        expect(
          result.filter((c) => c.routePathArray.length > 2).length > 0,
        ).toEqual(false);
      });
    });

    describe('findBestRoute', () => {
      it('should find best route', async () => {
        const result = await sushiswapRouterFactory.findBestRoute(
          new BigNumber(100),
        );
        expect(result.bestRouteQuote.routeText).toEqual('1INCH > WETH');
      });

      it('should return best route', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.findBestRoute(new BigNumber(100));

        expect(result.bestRouteQuote.routeText).toEqual('1INCH > WETH');
        expect(
          result.triedRoutesQuote.filter((c) => c.routePathArray.length > 2)
            .length > 0,
        ).toEqual(false);
      });
    });
  });

  describe('eth > erc20', () => {
    const fromToken = WETH.MAINNET();
    const toToken = MOCK1INCH();

    const sushiswapRouterFactory = new SushiswapRouterFactory(
      fromToken,
      toToken,
      false,
      ethersProvider,
    );

    describe('getAllPossibleRoutes', () => {
      it('should get all possible routes', async () => {
        const result = await sushiswapRouterFactory.getAllPossibleRoutes();
        expect(result.length > 0).toEqual(true);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.getAllPossibleRoutes();
        expect(result.length === 1).toEqual(true);
        expect(result[0][0]).toEqual(fromToken);
        expect(result[0][1]).toEqual(toToken);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(false);
      });
    });

    describe('getAllPossibleRoutesWithQuotes', () => {
      it('should get all possible routes with quote', async () => {
        const result = await sushiswapRouterFactory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1),
        );
        expect(result.length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1),
        );
        expect(
          result.filter((c) => c.routePathArray.length > 2).length > 0,
        ).toEqual(false);
      });
    });

    describe('findBestRoute', () => {
      it('should find best route', async () => {
        const result = await sushiswapRouterFactory.findBestRoute(
          new BigNumber(100),
        );
        expect(result.bestRouteQuote.routeText).toEqual('WETH > 1INCH');
      });

      it('should return best route', async () => {
        const factory = new SushiswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider,
        );

        const result = await factory.findBestRoute(new BigNumber(100));

        expect(result.bestRouteQuote.routeText).toEqual('WETH > 1INCH');
        expect(
          result.triedRoutesQuote.filter((c) => c.routePathArray.length > 2)
            .length > 0,
        ).toEqual(false);
      });
    });
  });
});
