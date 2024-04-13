export function encodeToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// Function to decode a base64 string to a normal string
export function decodeFromBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}
