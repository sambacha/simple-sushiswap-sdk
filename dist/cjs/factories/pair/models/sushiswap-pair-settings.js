"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiswapPairSettings = void 0;
class SushiswapPairSettings {
    constructor(settings) {
        this.slippage = settings?.slippage || 0.005;
        this.deadlineMinutes = settings?.deadlineMinutes || 20;
        this.disableMultihops = settings?.disableMultihops || false;
    }
}
exports.SushiswapPairSettings = SushiswapPairSettings;
