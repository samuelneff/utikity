import { createMultiProxy } from '../src/createMultiProxy';

test('simple', () => {

  const actual = createMultiProxy(
    {
      a: 'A',
      b: 'B',
    },
    {
      c: undefined,
      d: 'D',
    },
    {
      c: 'C',
      e: 'E'
    }
  );

  expect(actual.a).toBe('A');
  expect(actual.b).toBe('B');
  expect(actual.c).toBe(undefined);
  expect(actual.d).toBe('D');
  expect(actual.e).toBe('E');
});
