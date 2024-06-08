import { countMatching } from '../src/countMatching';

test('blank strings', () => {
  const actual = countMatching([ 'a', 'b', '', '' ], s => s !== '');
  expect(actual).toBe(2);
})