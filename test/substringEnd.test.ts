import { Delimiter, substringEnd } from '../src';

test('undefined, undefined', () => {
  const actual = substringEnd(undefined as unknown as string, undefined as unknown as string);
  expect(actual).toBe('');
});

test('undefined, string', () => {
  const actual = substringEnd(undefined as unknown as string, ',');
  expect(actual).toBe('');
});

test('string, undefined', () => {
  const actual = substringEnd('abc', undefined as unknown as string);
  expect(actual).toEqual('abc');
});


test('no match', () => {
  const actual = substringEnd('abc', 'd');
  expect(actual).toEqual('abc');
});

test('exclude delimiter', () => {
  const actual = substringEnd('abc', 'b');
  expect(actual).toEqual('c');
});

test('include delimiter', () => {
  const actual = substringEnd('abc', 'b', Delimiter.include);
  expect(actual).toEqual('bc');
});

test('exclude first-char delimiter', () => {
  const actual = substringEnd('abc', 'a');
  expect(actual).toEqual('bc');
});

test('include first-char delimiter', () => {
  const actual = substringEnd('abc', 'a', Delimiter.include);
  expect(actual).toEqual('abc');
});

test('exclude last-char delimiter', () => {
  const actual = substringEnd('abc', 'c');
  expect(actual).toEqual('');
});

test('include last-char delimiter', () => {
  const actual = substringEnd('abc', 'c', Delimiter.include);
  expect(actual).toEqual('c');
});

test('exclude multi-char delimiter', () => {
  const actual = substringEnd('abcdef', 'cde');
  expect(actual).toEqual('f');
});

test('include multi-char delimiter', () => {
  const actual = substringEnd('abcdef', 'cde', Delimiter.include);
  expect(actual).toEqual('cdef');
});

