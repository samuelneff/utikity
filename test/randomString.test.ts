import { defaultRandomChars, randomString } from '../src/randomString';

test('5, undefined', () => {
  const actual = randomString(5);
  expect(actual.length).toBe(5);
  const chars = actual.split('');
  const invalidChars = chars.filter(
    c => !(defaultRandomChars.includes(c))
  );
  expect(invalidChars).toEqual([]);
});
