import { HttpException, HttpStatus } from '@nestjs/common';
import { Error } from '../interfaces/error.interface';

export class NotFoundTaskException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        message: 'Task was not found',
        error: 'not_found_task_exception',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
