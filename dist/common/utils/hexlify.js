import { BigNumber as EthersBigNumber } from 'ethers';
import { hexlify as EthersHexlify } from 'ethers/lib/utils';
/**
 * Convert to hex
 * @param value The value
 */
export function hexlify(value) {
    return EthersHexlify(EthersBigNumber.from(value.toFixed()));
}
