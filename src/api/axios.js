import axios from "axios";

const env = process.env.REACT_APP_ENV || "dev";
console.log("-----------RUNNING ENV---------------")
console.log(env);
console.log("--------------------------")
var baseUrl = "";
if (env === "local") baseUrl = "http://localhost:8082";
else baseUrl = "https://api-dev.kinesin.health";

export default axios.create({
  baseURL: baseUrl,
});