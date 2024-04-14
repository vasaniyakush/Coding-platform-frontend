import { Typography } from "@mui/material";
const os = require("os");
function getIPv4Addresses() {
  const networkInterfaces = os.networkInterfaces();
  const addresses = {};

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
export default function Home({ openTab }) {
  const networkInterfaces = getIPv4Addresses();
  console.log("networkInterfaces: ", networkInterfaces);
  // const ip = networkInterfaces["eth0"][0]["address"];
  return <Typography paragraph>HEllo {openTab}</Typography>;
}
