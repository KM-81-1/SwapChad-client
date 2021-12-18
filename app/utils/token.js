export default function getToken(){
  require("nativescript-localstorage");
  const token = localStorage.getItem("jwt-token");
  return {
    "Authorization": "Bearer " + token
  }
}
