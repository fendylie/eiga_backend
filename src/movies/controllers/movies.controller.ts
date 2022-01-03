import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import e from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CreateMovieDto } from '../dto/create-movie.dto';

export const storage = {
  storage: diskStorage({
    destination: './uploads/movieImages',
    filename: (
      req: e.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) => {
      const filename: string =
        parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = parse(file.originalname).ext;

      callback(null, `${filename}${extension}`);
    },
  }),
};

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(id);
    const { url } = this.findMovieImage(movie.image);

    return {
      ...movie,
      image: {
        name: movie.image,
        url,
      },
    };
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file) {
    return {
      imagePath: file.filename,
    };
  }

  @Get('image/:name')
  findMovieImage(@Param('name') name) {
    return {
      url: join(process.cwd(), 'uploads/movieImages/' + name),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.moviesService.delete(id);
  }
}
