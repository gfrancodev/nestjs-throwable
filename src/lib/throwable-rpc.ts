import { Logger } from "@nestjs/common";
import { AxiosError } from "axios";

export class ThrowableRPC extends Error {
  protected logger = new Logger(ThrowableRPC.name)
  public message: string;
  public status: number;
  public headers: Record<string, string>;
  public data: unknown;
  public errn: string;
  public name: string;
  public axios: AxiosError;

  constructor(error: ThrowableTypes.CustomRPC) {
    const { msg, status, headers, data, name, errn, axios } = error;
    super();
    this.message = String(msg) ?? 'Internal Server Error';
    this.status = status ?? 0;
    this.headers = headers ?? {};
    this.data = data ?? null;
    this.errn = errn ?? 'Internal Server Error';
    this.name = name ?? 'CustomException';
    this.axios = axios ?? null;
    this.logger.error(
        `RESPONSE ${status} - ${JSON.stringify(data)}`,
      );
  }

  public getError(): ThrowableTypes.CustomRPC {
    return this.axios?.response?.data ?? null;
  }
}