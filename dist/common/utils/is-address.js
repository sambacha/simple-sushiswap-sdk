import { ethers } from 'ethers';
export function isAddress(address) {
    return ethers.utils.isAddress(address);
}
