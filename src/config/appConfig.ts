import { env } from "../../config/env";

export const appConfig = {
    smtp: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS
        }
    },
    app: {
        port: env.PORT
    },
    cors: {
        allowedOrigins: env.ALLOWED_ORIGINS.split(',')
    }
}