declare namespace ThrowableTypes {
    type Header = Record<string, string> | undefined;
    type Code = number;
    type Data = any | undefined;
  
    type Options = {
      id?: string | undefined;
      code?: number;
      headers?: Record<string, string> | undefined;
      data?: any | undefined;
      name?: string | undefined;
      message?: string | undefined;
    };

    type CustomRPC = {
        msg?: string;
        status?: number;
        headers?: Record<string, string>;
        data?: unknown;
        errn?: string;
        name?: string;
        axios?: AxiosError;
      };
  
    type Status = {
      code: number;
      name: string;
    };

    interface DefaultBody {
        statusCode: number
        message: string
        error: string 
    }

    interface ResponseBody {
        statusCode: number
        data: unknown
        error: string 
    }

    type Body = DefaultBody | ResponseBody
  
    interface Methods {
      getStatus(): Code;
      getData(): Data;
      getHeader(): Header;
      isHttpStatus(code: Code): Status | boolean;
    }
  }