import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  tap
} from 'rxjs';
import { Movie } from '../../models/movies.models';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { MovieComponent } from '../../shared/components/movie/movie.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    FormsModule,
    DatePipe,
    MillionPipe,
    MovieComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  title = 'harry-potter-movies';

  movies!: Observable<Movie[]>;

  searchByTitle = new Subject<string>();
  searchByReleaseYear = new Subject<string>();

  titleFilterValue!: string;
  releaseDateFilterValue!: string;
  searchInProgress = false;

  private defaultSearchValue = '';
  private readonly moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.movies = this.initializeMovies();
  }

  filterByTitle(): void {
    this.searchByTitle.next(this.titleFilterValue);
  }

  filterByReleaseDate(): void {
    this.searchByReleaseYear.next(this.releaseDateFilterValue);
  }

  /*
   * Here I'm combining the movies observable from the http request with two other observables for the filters
   * We listen to all observables and as they change (mainly the filter ones) we filter the list of movies with the new values
   * */
  private initializeMovies(): Observable<Movie[]> {
    return combineLatest([
      this.searchByReleaseYear.pipe(
        startWith(this.defaultSearchValue),
        debounceTime(250),
        distinctUntilChanged()
      ),
      this.searchByTitle.pipe(
        startWith(this.defaultSearchValue),
        debounceTime(250),
        distinctUntilChanged()
      ),
      this.moviesService.getAllMovies()
    ]).pipe(
      tap(([yearSearch, titleSearch]) => {
        this.searchInProgress = [yearSearch, titleSearch].some(
          value => value != this.defaultSearchValue
        );
      }),
      map(([yearSearch, titleSearch, movies]) => {
        let filteredMovies = movies;

        if (yearSearch !== this.defaultSearchValue) {
          filteredMovies = filteredMovies.filter(({ release_date }) =>
            release_date.startsWith(yearSearch)
          );
        }

        if (titleSearch !== this.defaultSearchValue) {
          filteredMovies = filteredMovies.filter(({ title }) =>
            title.toLowerCase().includes(titleSearch.toLowerCase())
          );
        }

        return filteredMovies;
      })
    );
  }
}
