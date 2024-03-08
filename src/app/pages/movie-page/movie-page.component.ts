import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieDetails } from '../../models/movies.models';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { MoviesService } from '../../services/movies.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [MillionPipe, DatePipe, RouterLink, DurationPipe, AsyncPipe],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent implements OnInit {
  @Input() id!: MovieDetails['id'];
  movie!: MovieDetails;

  private readonly moviesService = inject(MoviesService);
  private readonly title = inject(Title);

  ngOnInit(): void {
    this.moviesService.getMovieById(this.id).subscribe({
      next: response => {
        this.movie = response;
        this.title.setTitle(this.movie.title);
      },
      error: () => {
        this.title.setTitle('Harry Potter could not find the movie details');
      }
    });
  }
}
