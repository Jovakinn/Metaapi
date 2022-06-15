import { Status } from '../enums/status';
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Naming is required' })
  task: string;

  @ArrayNotEmpty({ message: 'Necessary to sign tags!' })
  @IsString({ each: true, message: 'Tags must be strings' })
  tags?: string[];

  @IsOptional()
  @IsEnum(Status, { message: 'Wrong status' })
  status?: Status;
}
