import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {MoviesService} from "../../services/movies.service";
import {Observable, of} from "rxjs";
import {Movie} from "../../../models/movies.models";

export const movieResolver: ResolveFn<Observable<Movie | undefined>> = (route) => {
  const movieId = route.paramMap.get('id');

  if (!movieId) {
    return of(undefined);
  }

  return inject(MoviesService).getMovieById(movieId);
};


