import { httpstatus } from "src/utils/http-status.utils";

export class ThrowableHttp extends Error implements ThrowableTypes.Methods {
    public code: number;
    public options: ThrowableTypes.Options;
  
    constructor(options: ThrowableTypes.Options, code?: ThrowableTypes.Code) {
      super();
      this.code = code;
      this.name = "ThrowableHttp";
      this.options = options;
      this.message = options?.message;
    }
  
    public getStatus(): ThrowableTypes.Code {
      return this.code;
    }
  
    public getData(): ThrowableTypes.Data {
      return this.options?.data;
    }
  
    public getHeader(): ThrowableTypes.Header {
      return this.options?.headers;
    }
  
    public isHttpStatus(): ThrowableTypes.Status {
      return (
        httpstatus.filter(status => status.code === this.code)[0] ?? {
          code: 500,
          name: `${this.code} - Status code does not belong to an http protocol`,
        }
      );
    }
  }