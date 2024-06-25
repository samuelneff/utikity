import { localeIncludes } from '../src/localeIncludes';

test('simple', () => {
  const actual = localeIncludes(
    'abcdèfghíjklmñōpqrStuvwxyz',
    'efghIjklmnOpqrş'
  );
  expect(actual).toBeTruthy();
});

test('false', () => {
  const actual = localeIncludes(
    'abcdèfghíjkl',
    'z'
  );
  expect(actual).toBeFalsy();
});
