import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieDetails } from '../models/movies.models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieApiUrl: string = '/movies';
  private readonly http = inject(HttpClient);

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieApiUrl);
  }

  getMovieById(movieId: MovieDetails['id']): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.movieApiUrl}/${movieId}`);
  }
}
