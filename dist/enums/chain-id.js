export var ChainId;
(function (ChainId) {
    ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
    ChainId[ChainId["ROPSTEN"] = 3] = "ROPSTEN";
    ChainId[ChainId["RINKEBY"] = 4] = "RINKEBY";
    ChainId[ChainId["G\u00D6RLI"] = 5] = "G\u00D6RLI";
    ChainId[ChainId["KOVAN"] = 42] = "KOVAN";
})(ChainId || (ChainId = {}));
export const ChainNames = new Map([
    [ChainId.MAINNET, 'mainnet'],
    [ChainId.ROPSTEN, 'ropsten'],
    [ChainId.RINKEBY, 'rinkeby'],
    [ChainId.GÖRLI, 'görli'],
    [ChainId.KOVAN, 'kovan'],
]);
