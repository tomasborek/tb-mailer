import { env } from "../../config/envLoader";

export const appConfig = {
  smtp: {
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  },
  email: {
    from: env.EMAIL_FROM,
  },
  app: {
    port: env.PORT,
  },
  cors: {
    allowedOrigins: env.ALLOWED_ORIGINS.split(",").includes("*")
      ? "*"
      : env.ALLOWED_ORIGINS.split(","),
  },
};
