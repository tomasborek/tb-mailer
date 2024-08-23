import type {Request, Response} from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import {Controller} from "@/utils/decorators/catch.decorator";
import { Validate } from "@/utils/decorators/validate.decorator";
import { SuccessResponse } from "@/utils/feedback/responses";

const schema = z.object({
    from: z.string().optional(),
    to: z.string(),
    subject: z.string(),
    html: z.string().optional(),
    text: z.string().optional()
});

interface ISMTPOptions{
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    }
}

export class EmailController {
    constructor(private options: ISMTPOptions){}

    @Controller()
    @Validate(schema)
     public async send(req: Request, res: Response) {
        const transporter = nodemailer.createTransport(this.options); 

        const { to, subject, html, text } = req.body;

        const options = {
            from: 'mailer@tomasborek.eu',
            to,
            subject,
            html,
            text
        };

        await transporter.sendMail(options);

        return new SuccessResponse(res, {message: "Email sent"}).send();
    }
}