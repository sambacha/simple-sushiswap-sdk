export declare class SushiswapPairSettings {
    slippage: number;
    deadlineMinutes: number;
    disableMultihops: boolean;
    constructor(settings?: {
        slippage?: number | undefined;
        deadlineMinutes?: number | undefined;
        disableMultihops?: boolean | undefined;
    });
}
