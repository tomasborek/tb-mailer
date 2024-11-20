import { cleanEnv, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: str({ default: "3030" }),
  SMTP_HOST: str({ default: "smtp.forpsi.com" }),
  SMTP_PORT: str({ default: "587" }),
  SMTP_USER: str(),
  SMTP_PASS: str(),
  ALLOWED_ORIGINS: str(),
  ROOT_DOMAIN: str({ default: "tomasborek.dev" }),
});
