import { countValues } from '../src/countValues';

test('Five', () => {
  const input = [
    'a',
    1,
    new Date(),
    [ 1, 2 ],
    false,
    undefined,
    null,
    '',
    [],
    Number.NaN,
  ];
  const actual = countValues(input);
  expect(actual).toBe(5);
});
