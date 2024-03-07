import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieDetails } from '../../models/movies.models';
import { MillionPipe } from '../../shared/pipes/million.pipe';
import { DatePipe } from '@angular/common';
import { DurationPipe } from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [MillionPipe, DatePipe, RouterLink, DurationPipe],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent {
  @Input() movie: MovieDetails | undefined;
}
