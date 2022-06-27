"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapError = void 0;
class SushiswapError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'SushiswapError';
        this.message = message;
        this.code = code;
    }
}
exports.SushiswapError = SushiswapError;
