/**
 * Get unix timestamp
 * @param date The date
 */
export function getUnixTime(date) {
    return (date.getTime() / 1e3) | 0;
}
