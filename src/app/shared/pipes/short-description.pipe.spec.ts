import { TestBed } from '@angular/core/testing';
import { ShortDescriptionPipe } from './short-description.pipe';

describe('ShortDescriptionPipe', () => {
  let pipe: ShortDescriptionPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShortDescriptionPipe],
      providers: [ShortDescriptionPipe],
    });

    pipe = TestBed.inject(ShortDescriptionPipe);
  });

  it('should return the first 15 characters of the string', () => {
    const result = pipe.transform(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );
    expect(result).toEqual('Lorem ipsum dol...');
  });

  it('should return the first 10 characters of the string with a custom max length', () => {
    const pipe = new ShortDescriptionPipe();
    const result = pipe.transform(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      10
    );
    expect(result).toEqual('Lorem ipsu...');
  });
});
