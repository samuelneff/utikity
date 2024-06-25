import { localeStartsWith } from '../src/localeStartsWith';

test('simple', () => {
  const actual = localeStartsWith(
    'abcdèfghíjklmñōpqrStuvwxyz',
    'ǍbcdefghIjklmnOpqrş'
  );
  expect(actual).toBeTruthy();
});

test('false', () => {
  const actual = localeStartsWith(
    'abcdèfghíjklmñōpqrStuvwxyz',
    'c'
  );
  expect(actual).toBeFalsy();
});
