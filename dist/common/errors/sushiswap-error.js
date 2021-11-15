export class SushiswapError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'SushiswapError';
        this.message = message;
        this.code = code;
    }
}
