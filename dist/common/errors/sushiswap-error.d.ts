import { ErrorCodes } from '../..';
export declare class SushiswapError extends Error {
    name: string;
    code: ErrorCodes;
    message: string;
    constructor(message: string, code: ErrorCodes);
}
