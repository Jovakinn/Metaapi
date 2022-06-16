import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailPipe implements PipeTransform {
  private readonly logger: Logger;
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isEmail(value)) {
      this.logger.log(metadata);
      throw new BadRequestException('Incorrect data');
    }
    return value;
  }
}
