import { BigNumber as EthersBigNumber } from 'ethers';
export function toEthersBigNumber(value) {
    return EthersBigNumber.from(value.toFixed());
}
