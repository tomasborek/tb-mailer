import express from "express";
import morgan from "morgan";
import { logger } from "./utils/logger";
import helmet from "helmet";
import { appConfig } from "./config/appConfig";
import { appRouter } from "./container";
import cors from "cors";

const app = express();

app.use(express.json({limit: '1kb'}));

app.use(cors({
    origin: appConfig.cors.allowedOrigins
}));

app.use(helmet())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/', appRouter);

app.listen(appConfig.app.port, () => {
    logger.info(`Server is running on port ${appConfig.app.port}`);
})