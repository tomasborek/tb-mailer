import { Router } from "express";
import { EmailController } from "./controllers/email.controller";
import {appConfig} from "@/config/appConfig";

const emailController = new EmailController(appConfig.smtp);

export const appRouter = Router().post('/', emailController.send.bind(emailController));