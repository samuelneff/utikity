import { mapCount } from '../src/mapCount';

test('simple count', () => {
  const actual = mapCount(3, i => String.fromCharCode(i + 65));
  expect(actual).toEqual([ 'A', 'B', 'C' ]);
});
