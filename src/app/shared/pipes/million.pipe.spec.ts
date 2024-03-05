import { MillionPipe } from './million.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new MillionPipe();
    expect(pipe).toBeTruthy();
  });
});
