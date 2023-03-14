import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    Logger,
  } from '@nestjs/common';
  import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
  import { ThrowableHttp } from './throwable-http';
  
  @Catch()
  export class ThrowableHttpFilter implements ExceptionFilter {
    private httpAdapter: AbstractHttpAdapter;
    protected readonly logger = new Logger("ThrowableHttp");
  
    constructor(private readonly adapterHost: HttpAdapterHost) {
      this.httpAdapter = adapterHost.httpAdapter;
    }
  
    public catch(exception: any, host: ArgumentsHost) {
      const contextHttp = host.switchToHttp();
      const response = contextHttp.getResponse();
  
      let statusCode = 404;
      let error: string | undefined = "Not Found";
      const body: ThrowableTypes.Body = {
         statusCode,
         message: "An unexpected error occurred",
         error
      };
  
      if (exception instanceof ThrowableHttp) {
        const status = exception?.getStatus();
        const data = exception?.getData();
        const headers = exception?.getHeader();
  
        this.logger.error(
          `RESPONSE ${status} - ${JSON.stringify(data)}`,
          exception?.isHttpStatus().name
        );
  
        if (exception?.isHttpStatus().code) {
          statusCode = status
          error = exception?.isHttpStatus().name;
        }
  
        if (exception?.options.headers) {
          Object.entries(headers).forEach(header => {
            this.logger.error('HEADER', header.join(': '));
            this.httpAdapter?.setHeader(response, header[0], String(header[1]));
          });
        }
  
        const body = {
            statusCode,
            data,
            error,
        };
        return this.httpAdapter?.reply(response, body, statusCode);
      }
  
      this.logger.error(
        `RESPONSE ${statusCode} - ${error}`,
        JSON.stringify(body),
      );
      return this.httpAdapter?.reply(response, body, statusCode);
    }
  }