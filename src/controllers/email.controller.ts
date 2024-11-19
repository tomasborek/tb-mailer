import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import { Controller } from "@/utils/decorators/catch.decorator";
import { Validate } from "@/utils/decorators/validate.decorator";
import { SuccessResponse } from "@/utils/feedback/responses";

const schema = z
  .object({
    from: z.string().optional(),
    to: z.string(),
    subject: z.string(),
    html: z.string().optional(),
    text: z.string().optional(),
  })
  .strict();

export class EmailController {
  constructor(
    private transporter: nodemailer.Transporter,
    private emailFrom: string,
  ) {}

  @Controller()
  @Validate(schema)
  public async send(req: Request, res: Response) {
    const { to, subject, html, text } = req.body;

    const options = {
      from: this.emailFrom,
      to,
      subject,
      html,
      text,
    };

    await this.transporter.sendMail(options);

    return new SuccessResponse(res, { message: "Email sent" }).send();
  }
}
