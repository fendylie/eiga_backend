import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, description, publishDate, image } = createMovieDto;

    return await this.moviesRepository.save({
      title,
      description,
      publishDate,
      image,
    });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  async delete(id: string): Promise<void> {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException();
    }

    await this.moviesRepository.softDelete(id);
  }
}
