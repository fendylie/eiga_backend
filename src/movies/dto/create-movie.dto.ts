import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  publishDate: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
