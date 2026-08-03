export const getCallbackBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return apiBaseUrl.includes("https://bss-api.skyfi.network")
    ? "https://skyfi.network"
    : "https://skyfi.vn";
};

export const getSocketUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return apiBaseUrl.includes("https://bss-api.skyfi.network")
    ? "https://socket.skyfi.network/"
    : "https://socket.skyfi.pro/";
};

// get Meet URL
export const getMeetUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return apiBaseUrl.includes("https://bss-api.skyfi.network")
    ? "meet.skyfi.network"
    : "meet.skyfi.pro";
}
