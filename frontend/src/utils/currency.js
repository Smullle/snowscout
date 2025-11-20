// Currency conversion utilities

// JPY to USD conversion rate (approximate)
// In a production app, this would be fetched from an API
const JPY_TO_USD_RATE = 0.0064;

/**
 * Converts Japanese Yen to US Dollars
 * @param {number} yen - Amount in Japanese Yen
 * @returns {string} Formatted USD amount
 */
export const convertYenToUSD = (yen) => {
    const usd = yen * JPY_TO_USD_RATE;
    return usd.toFixed(2);
};

/**
 * Formats a price display with both JPY and USD
 * @param {number} yen - Amount in Japanese Yen
 * @returns {string} Formatted price string like "¥7,400 ($47.34)"
 */
export const formatPriceWithUSD = (yen) => {
    const usd = convertYenToUSD(yen);
    return `¥${yen.toLocaleString()} ($${usd})`;
};
