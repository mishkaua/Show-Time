import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsNotEmpty()
  readonly passwordConfirmation: string;
}
