/**
 * Converts a Base64 string to a Hexadecimal string.
 * @param {string} base64Str - The Base64 encoded string.
 * @returns {string} The Hexadecimal representation of the input.
 */
export const base64ToHex = (base64Str) => {
    const raw = atob(base64Str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
        const hex = raw.charCodeAt(i).toString(16);
        result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result.toUpperCase();
};
