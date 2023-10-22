import { serialize } from "cookie";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const ENCRYPTION_KEY = "my-secret-key"; // Replace with your own secret key.
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

type UserCookieServiceProps = {
	cookieName: string;
  encryptionKey: string;
  maxAge: number;
};

export function UserCookieService({
	cookieName,
  encryptionKey,
  maxAge,
}: UserCookieServiceProps) {
  const create = (userId: string, name: string) => {
    const iv = randomBytes(16);
    const cipher = createCipheriv(
      "aes-256-cbc",
      Buffer.from(encryptionKey),
      iv
    );

    const data = JSON.stringify({ userId, name });
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Set the cookie with a lifespan of 30 days.
    return serialize(cookieName, `${iv.toString("hex")}:${encrypted}`, {
      maxAge, // 30 days in seconds
      path: "/",
    });
  };

  const parse = (cookie: string) => {
    const [ivHex, encrypted] = cookie.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryptionKey),
      iv
    );
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  };

  return {
    create,
    parse,
  };
}
