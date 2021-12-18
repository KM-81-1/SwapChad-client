export default function getHostName(){
  const envData = require("@/../envconf.json");
  return envData.server;
}
