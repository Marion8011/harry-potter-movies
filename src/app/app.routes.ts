import { Routes } from '@angular/router';
import {movieResolver} from "./shared/resolvers/movie.resolver";

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () => import('./pages/home-page/home-page.component').then(c => c.HomePageComponent)
  },
  {
    path: 'movies/:id',
    resolve: {
      movie: movieResolver,
    },
    loadComponent: () => import('./pages/movie-page/movie-page.component').then(c => c.MoviePageComponent)
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];
