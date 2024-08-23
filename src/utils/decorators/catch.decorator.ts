import type { Request, Response } from "express";
import { HttpsResponse, ServerErrorResponse } from "@/utils/feedback/responses";
import { ApplicationError } from "@/utils/feedback/errors";

export const Controller = () => {
  return (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: [Request, Response ]) {
      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        console.log("🚀 ~ error:", error)
        const [_, res] = args;
        if(error instanceof ApplicationError){
          return new HttpsResponse(res, {status: error.status, message: error.message}).send();
        }
        return new ServerErrorResponse(res).send();
      }
    };
  };
};
