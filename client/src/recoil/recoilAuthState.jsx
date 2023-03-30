import { atom } from "recoil";

/**
 * 로그인 하였는가
 */
export const authState = atom({
  key: "auth",
  default: false,
});
