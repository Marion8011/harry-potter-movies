import {Component, inject, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {TestOnlyOptions} from "@angular/compiler-cli/src/ngtsc/core/api";
import {combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, Subject} from "rxjs";
import {Movie, MovieForList} from "../../../models/movies.models";
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MillionPipe} from "../../shared/pipes/million.pipe";
import {MovieComponent} from "../../shared/components/movie/movie.component";

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
export class HomePageComponent implements OnInit{

  private defaultSearchValue = '';

  movies!: Observable<MovieForList[]>

  searchByTitle = new Subject<string>();
  searchByReleaseYear = new Subject<string>();

  titleFilterValue!: string;
  releaseDateFilterValue!: string;

  private readonly moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.movies = this.initializeMovies();
  }

  filterByTitle(): void{
    this.searchByTitle.next(this.titleFilterValue);
  }

  filterByReleaseDate(): void{
    this.searchByReleaseYear.next(this.releaseDateFilterValue);
  }

  initializeMovies(): Observable<MovieForList[]>{
    return combineLatest([
      this.searchByReleaseYear.pipe(
        startWith(this.defaultSearchValue),
        debounceTime(250),
        distinctUntilChanged(),
      ),
      this.searchByTitle.pipe(
        startWith(this.defaultSearchValue),
        debounceTime(250),
        distinctUntilChanged(),
      ),
      this.moviesService.getAllMovies()
    ]).pipe(
      map(([yearSearch, titleSearch, movies]) => {
        let filteredMovies = movies;

        if(yearSearch !== this.defaultSearchValue){
          filteredMovies = filteredMovies.filter(({release_date}) => release_date.startsWith(yearSearch));
        }

        if(titleSearch !== this.defaultSearchValue){
          filteredMovies = filteredMovies.filter(({title}) => title.toLowerCase().includes(titleSearch));
        }

        return filteredMovies
      }),
    )
  }
}