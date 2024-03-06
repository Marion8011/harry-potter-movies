import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieForList } from '../../models/movies.models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieApiUrl: string = '/movies';
  private readonly http = inject(HttpClient);

  getAllMovies(): Observable<MovieForList[]> {
    return this.http.get<MovieForList[]>(this.movieApiUrl);
  }

  getMovieById(movieId: Movie['id']): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieApiUrl}/${movieId}`);
  }
}
