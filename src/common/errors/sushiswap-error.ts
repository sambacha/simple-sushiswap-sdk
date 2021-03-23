import { ErrorCodes } from '../..';

export class SushiswapError extends Error {
  public name = 'SushiswapError';
  public code: ErrorCodes;
  public message: string;
  constructor(message: string, code: ErrorCodes) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
