import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieResolver } from './movie.resolver';
import { Observable } from 'rxjs';
import { Movie } from '../../../models/movies.models';

describe('movieResolver', () => {
  const executeResolver: ResolveFn<Observable<Movie | undefined>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() => movieResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
