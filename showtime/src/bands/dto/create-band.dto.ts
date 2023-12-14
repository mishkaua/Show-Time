import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBandDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly genre: [string];
}
