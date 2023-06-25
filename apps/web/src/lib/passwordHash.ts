import crypto from "crypto";

const passwordHash = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

export default passwordHash;
