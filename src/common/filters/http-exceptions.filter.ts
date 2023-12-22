import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ? exception.getStatus() : 500;
    const msg = exception.message;

    response
      .status(status)
      .json({
        statusCode: status,
        timeStamp: new Date().toISOString(),
        path: request.url,
        msg,
        help: "Please visit documentation : http:\\help.com"
      });
  }
}