import type { ZodSchema } from "zod";
import { ZodError } from "zod";
import type {Request, Response} from "express";
import { ValidationError } from "../feedback/errors";

export const Validate = (schema: ZodSchema, options?: {validateQuery: boolean}) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return (_target: any, _propertyKey: any, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: [Request, Response]) {
            const [req, res] = args;
            const body = req.body;
            const query = req.query;
            try {
              schema.parse(options?.validateQuery ? query : body);
            } catch (error: unknown) {
              throw new ValidationError(
                error instanceof ZodError
                  ? error.errors[0].message
                  : "Schema validation error"
              );
            }
            return await originalMethod.apply(this, args);
          };
    }
}