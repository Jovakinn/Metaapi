import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    deprecated: true,
    description: 'Use the name property instead',
  })
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  public password: string;

  @ApiProperty({
    description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
    example: '+123123123123',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  public phoneNumber: string;
}
