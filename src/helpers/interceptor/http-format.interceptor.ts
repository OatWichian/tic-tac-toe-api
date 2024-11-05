import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as ResponseErrorThMapping from 'src/asset/response-error-th.json';
import * as ResponseErrorMapping from 'src/asset/response-error.json';
import { ResponseMapping } from '../mapping/response.mapping';

export interface Response<T> {
  code: string;
  msg: string;
  data: T;
}

@Injectable()
export class HttpFormatInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(this.constructor.name);

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const startTime = new Date();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const duration = new Date().getTime() - startTime.getTime();
        this.logger.debug(
          `Success :: ${this.formatLog(request.method, request.url, response.statusCode, '0', duration)}`,
        );

        const respBody = {
          ...ResponseMapping.common.success,
          data,
        };
        return respBody;
      }),
      catchError((error) => {
        console.log('error: ', error);
        const duration = new Date().getTime() - startTime.getTime();
        this.logger.debug(
          `Error :: ${this.formatLog(request.method, request.url, error.status, error.response?.code, duration)}`,
        );
        // check if env. is dev
        console.error('Error stack :: ', error);

        const response: any = {
          code: `${error.response?.code || error.status || 500}`,
          msg:
            ResponseErrorMapping[error.response?.code || error.status || 500] ||
            error.response?.msg ||
            error.response?.message ||
            null,
          msgTh:
            ResponseErrorThMapping[error.response?.code || error.status || 500] ||
            error.response?.msgTh ||
            error.response?.message ||
            null,
          data: null,
          error: {
            status: error.response?.code || error.status || 500,
            desc: error?.response?.msg || error.response?.message,
          },
        };
        return throwError(() => new HttpException(response, error.status || 500, { cause: error }));
      }),
    );
  }

  private formatLog(method: string, url: string, resStatus: string = '500', resCode: string = '0', duration: number) {
    return `[${method}] ${url} ${resStatus}:${resCode} ${duration}ms`;
  }
}
