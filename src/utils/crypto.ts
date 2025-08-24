import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_BLOG_SECRET_KEY || "fallbackKey"; // ⚠️ keep this in .env instead

export const encryptId = (id: string) => {
  return CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
};

export const decryptId = (encryptedId: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedId, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};