import { arrayOf } from '../src/arrayOf';

test('numbers', () => {
  const actual = arrayOf(1, 3);
  expect(actual).toEqual([ 1, 1, 1 ]);
});
