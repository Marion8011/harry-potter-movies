import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../../models/movies.models';

export const movieResolver: ResolveFn<
  Observable<Movie | undefined>
> = route => {
  const movieId = route.paramMap.get('id');
  const moviesService = inject(MoviesService);

  if (!movieId) {
    return of(undefined);
  }

  return moviesService.getMovieById(movieId);
};
