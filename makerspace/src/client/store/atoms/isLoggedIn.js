import { atom } from "recoil";
let token = localStorage.getItem("token");
if (token == "" || token == undefined) {
  token = false;
}
const defaultLoggedIn = token !== null ? token : false;
export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: defaultLoggedIn,
});
