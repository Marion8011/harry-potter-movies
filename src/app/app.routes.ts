import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'films',
    title: 'Harry Potter Movies',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        c => c.HomePageComponent
      )
  },
  {
    path: 'films/:id',
    loadComponent: () =>
      import('./pages/movie-page/movie-page.component').then(
        c => c.MoviePageComponent
      )
  },
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full'
  },
  {
    path: '**',
    title: 'Harry Potter has failed',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/error-page/error-page.component').then(
        c => c.ErrorPageComponent
      )
  }
];
