import { Delimiter, substringStart } from '../src';

test('undefined, undefined', () => {
  const actual = substringStart(undefined as unknown as string, undefined as unknown as string);
  expect(actual).toBeUndefined();
});

test('undefined, string', () => {
  const actual = substringStart(undefined as unknown as string, ',');
  expect(actual).toBeUndefined();
});

test('string, undefined', () => {
  const actual = substringStart('abc', undefined as unknown as string);
  expect(actual).toEqual('abc');
});


test('no match', () => {
  const actual = substringStart('abc', 'd');
  expect(actual).toEqual('abc');
});

test('exclude delimiter', () => {
  const actual = substringStart('abc', 'b');
  expect(actual).toEqual('a');
});

test('include delimiter', () => {
  const actual = substringStart('abc', 'b', Delimiter.include);
  expect(actual).toEqual('ab');
});

test('exclude first-char delimiter', () => {
  const actual = substringStart('abc', 'a');
  expect(actual).toEqual('');
});

test('include first-char delimiter', () => {
  const actual = substringStart('abc', 'a', Delimiter.include);
  expect(actual).toEqual('a');
});

test('exclude last-char delimiter', () => {
  const actual = substringStart('abc', 'c');
  expect(actual).toEqual('ab');
});

test('include last-char delimiter', () => {
  const actual = substringStart('abc', 'c', Delimiter.include);
  expect(actual).toEqual('abc');
});

test('exclude multi-char delimiter', () => {
  const actual = substringStart('abcdef', 'cde');
  expect(actual).toEqual('ab');
});

test('include multi-char delimiter', () => {
  const actual = substringStart('abcdef', 'cde', Delimiter.include);
  expect(actual).toEqual('abcde');
});

