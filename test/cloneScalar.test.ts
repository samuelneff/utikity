import { cloneScalars } from '../src';

test('Include and exclude', () => {
  const source = {
    str: 'Hello',
    num: 1,
    bool: true,
    date: new Date('2024-01-01'),
    nil: null,
    child: {
      excluded: 'me'
    },
    stuff: [ 1, 2, 3 ],
    func() {
    },
    sym: Symbol('')
  };

  const actual = cloneScalars(source);

  const expected = {
    str: 'Hello',
    num: 1,
    bool: true,
    date: new Date('2024-01-01'),
  };

  expect(actual).toEqual(expected);
});
