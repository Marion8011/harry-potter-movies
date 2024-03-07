import { Component, Input } from '@angular/core';
import { MillionPipe } from '../../pipes/million.pipe';
import { Movie } from '../../../models/movies.models';
import { RouterLink } from '@angular/router';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MillionPipe, RouterLink, DurationPipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie!: Movie;
}
