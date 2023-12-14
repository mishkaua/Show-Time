import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateConcertDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly band: string;

  @IsNotEmpty()
  readonly genre: [string];

  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  readonly totalTickets: number;
}
