import { ErrorCodes } from './error-codes';
import { SushiswapError } from './sushiswap-error';

describe('SushiswapError', () => {
  const message = 'message_error';
  const code = ErrorCodes.canNotFindChainId;
  const sushiswapError = new SushiswapError(message, code);

  it('should have the correct name on error', () => {
    expect(sushiswapError.name).toEqual('SushiswapError');
  });

  it('should have the correct code on error', () => {
    expect(sushiswapError.code).toEqual(code);
  });

  it('should have the correct message on error', () => {
    expect(sushiswapError.message).toEqual(message);
  });
});
