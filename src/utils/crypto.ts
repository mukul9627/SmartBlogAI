// src/utils/crypto.ts
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.ENCRYPTION_SECRET || "fallback-secret"; // keep this safe

// Encrypt ID
export function encryptId(id: string): string {
  return CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
}

// Decrypt ID
export function decryptId(encryptedId: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("❌ Decryption error:", err);
    return "";
  }
}
