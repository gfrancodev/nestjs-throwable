import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { ThrowableRPC } from './throwable-rpc';

@Catch(ThrowableRPC)
export class ThrowablegRPCFilter
  implements RpcExceptionFilter<ThrowableRPC>
{
  catch(exception: ThrowableRPC, host: ArgumentsHost): Observable<any> {
    if (exception instanceof ThrowableRPC) {
      const ctx = host.switchToHttp();
      ctx.getResponse<Response>()
      return throwError(() => {
        throw new RpcException({
          code: exception.axios.response?.status ?? 0,
          message: exception.axios.response.statusText ?? "Internal Server Error"
        })
      });

    }
  }
}
