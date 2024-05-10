import Axios from "axios";

// let urls = {
//     test: `https://zljf0gm0-3000.inc1.devtunnels.ms/api/v1/`,
//     development: 'https://zljf0gm0-3000.inc1.devtunnels.ms/api/v1/',
//     production: 'https://zljf0gm0-3000.inc1.devtunnels.ms/api/v1/'
// }
// let urls = {
//   test: `https://7q0xhxzq-8080.inc1.devtunnels.ms/`,
//   development: "https://7q0xhxzq-8080.inc1.devtunnels.ms/",
//   production: "https://7q0xhxzq-8080.inc1.devtunnels.ms/",
// };
let urls = {
  test: `http://localhost:3000`,
  // development: "https://7q0xhxzq-8080.inc1.devtunnels.ms/",
  // production: "https://7q0xhxzq-8080.inc1.devtunnels.ms/",
  development: "http://127.0.0.1:8080/",
  production: "http://127.0.0.1:8080/",
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV || "production"],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
