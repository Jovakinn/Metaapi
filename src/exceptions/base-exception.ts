import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';

export class BaseExceptionFilter<T = any> implements ExceptionFilter<T> {
  catch = (exception: T, host: ArgumentsHost): any => {
    if (!(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host);
    }
  };
  public handleUnknownError(exception: T, host: ArgumentsHost) {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
    };
  }
}
