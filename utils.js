const os = require("os");

export function encodeToBase64(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (error) {
    console.error("Error encoding string to base64:", error);
    return ""; // Return empty string in case of error
  }
}

// Function to decode a base64 string to a normal string
export function decodeFromBase64(str) {
  try {
    console.log("str", str);
    return decodeURIComponent(escape(atob(str)));
  } catch (error) {
    console.error("Error encoding string to base64:", error);
    return ""; // Return empty string in case of error
  }
}
export function getIPv4Addresses() {
  console.log("HELLO");
  const networkInterfaces = os.networkInterfaces();
  const addresses = {};
  console.log(networkInterfaces);

  // Extract IPv4 addresses for Wi-Fi and Ethernet interfaces
  for (const [interfaceName, interfaceInfo] of Object.entries(
    networkInterfaces
  )) {
    if (interfaceName === "Wi-Fi" || interfaceName.startsWith("Ethernet")) {
      const ipv4Addresses = interfaceInfo.filter(
        (info) => info.family === "IPv4"
      );
      addresses[interfaceName] = ipv4Addresses.map((info) => info.address);
    }
  }

  return addresses;
}
