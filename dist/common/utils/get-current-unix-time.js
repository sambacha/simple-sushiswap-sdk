import { getUnixTime } from './get-unix-time';
/**
 * Get the current unit time
 */
export function getCurrentUnixTime() {
    return getUnixTime(new Date());
}
