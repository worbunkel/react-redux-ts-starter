import { boundValue } from './utils';

describe('utils', () => {
  describe(`boundValue`, () => {
    it('should return a value at the max when passed a value above the max', () => {
      const value = 100;
      const min = 0;
      const max = 10;

      const result = boundValue(value, min, max);

      expect(result).toBe(max);
    });

    it('should return a value at the min when passed a value below the min', () => {
      const value = -100;
      const min = 0;
      const max = 10;

      const result = boundValue(value, min, max);

      expect(result).toBe(min);
    });

    it('should return the value passed in when it is within the min and max', () => {
      const value = 5;
      const min = 0;
      const max = 10;

      const result = boundValue(value, min, max);

      expect(result).toBe(value);
    });
  });
});
