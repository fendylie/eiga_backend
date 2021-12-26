import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find();
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
