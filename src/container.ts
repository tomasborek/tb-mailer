import { Router } from "express";
import { EmailController } from "./controllers/email.controller";
import { appConfig } from "@/config/appConfig";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(appConfig.smtp);
const emailController = new EmailController(
  transporter,
  appConfig.app.rootDomain,
);

export const appRouter = Router().post(
  "/",
  emailController.send.bind(emailController),
);
