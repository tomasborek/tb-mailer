import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import { Controller } from "@/utils/decorators/catch.decorator";
import { Validate } from "@/utils/decorators/validate.decorator";
import { SuccessResponse } from "@/utils/feedback/responses";
import { allowedProjects } from "@/config/allowedProjects";
import { NotFoundError } from "@/utils/feedback/errors";

const schema = z
  .object({
    projectId: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    bulkTo: z.array(z.string()).optional(),
    subject: z.string(),
    html: z.string().optional(),
    text: z.string().optional(),
  })
  .strict();

type RequestData = z.infer<typeof schema>;

export class EmailController {
  constructor(
    private transporter: nodemailer.Transporter,
    private rootDomain: string,
  ) {}

  @Controller()
  @Validate(schema)
  public async send(req: Request, res: Response) {
    const { to, subject, html, text, bulkTo, projectId } = req.body as RequestData;
    const project = allowedProjects.find((project) => project.id === projectId);
    if(!project){
      throw new NotFoundError("Project not found");
    }

    const bulkToEmails = project.bulkTo ?? bulkTo ?? [];

    const options = {
      from: `mailer@${this.rootDomain}`,
      to: project.to ?? to,
      subject: project.subject ?? subject,
      html: project.html ?? html,
      text: project.text ?? text,
    };

    if(bulkToEmails.length){
      for(const email in bulkToEmails){
        await this.transporter.sendMail({ ...options, to: email });
      }
    }else{
      await this.transporter.sendMail(options);
    }

    return new SuccessResponse(res, { message: "Email sent" }).send();
  }
}
