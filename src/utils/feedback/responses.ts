import type {Response} from "express";
import moment from "moment";


interface IFormattedResponse {
  meta: {
    date: Date;
    status: number;
    message: string;
  };
  data: object;
}

interface IResponseConfig {
  status: number;
  message: string;
  data?: object;
}

interface ISpecificResponseConfig {
  status?: number;
  message?: string;
  data?: object;
}

export class HttpsResponse {
  private config: IResponseConfig;
  private res: Response;
  constructor(res: Response, config: IResponseConfig) {
    this.config = config;
    this.res = res;
  }
  public send() {
    this.res.status(this.config.status).send({
      meta: {
        date: moment().toDate(),
        status: this.config.status,
        message: this.config.message,
        data: this.config.data || {},
    }
  });
};
};

export class SuccessResponse extends HttpsResponse {
  constructor(res: Response, config?: ISpecificResponseConfig) {
    super(res, {
      ...config,
      status: config?.status ?? 200,
      message: config?.message ?? "Success",
    });
  }
}

export class CreatedResponse extends HttpsResponse {
  constructor(res: Response, config?: ISpecificResponseConfig) {
    super(res, {
      ...config,
      status: config?.status ?? 201,
      message: config?.message ?? "Created",
    });
  }
}

export class ServerErrorResponse extends HttpsResponse {
  constructor(res: Response, config?: ISpecificResponseConfig) {
    super(res, {
      ...config,
      status: config?.status ?? 500,
      message: config?.message ?? "Internal server error",
    });
  }
}
