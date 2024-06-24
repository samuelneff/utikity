import { mapFirst } from '../src/mapFirst';

test('simple', () => {
  const items = [ 1, 2, 3 ];
  const actual = mapFirst(
    items,
    i => i > 1 ? i : null
  );
  expect(actual).toBe(2);
});

test('indexed', () => {
  const items = [ 1, 2, 3 ];
  const actual = mapFirst(
    items,
    (i, index) => i > 1 && index > 1 ? i : null
  );
  expect(actual).toBe(3);
});