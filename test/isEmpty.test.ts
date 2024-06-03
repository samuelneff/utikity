import { isEmpty } from '../src/isEmpty';

test('undefined', () => {
  const actual = isEmpty(undefined);
  expect(actual).toBeTruthy();
});

test('null', () => {
  const actual = isEmpty(null);
  expect(actual).toBeTruthy();
});

test('empty string', () => {
  const actual = isEmpty('');
  expect(actual).toBeTruthy();
});

test('empty array', () => {
  const actual = isEmpty([]);
  expect(actual).toBeTruthy();
});

test('empty map', () => {
  const actual = isEmpty(new Map());
  expect(actual).toBeTruthy();
});

test('empty set', () => {
  const actual = isEmpty(new Set());
  expect(actual).toBeTruthy();
});

test('empty object', () => {
  const actual = isEmpty({});
  expect(actual).toBeTruthy();
});

test('boolean true', () => {
  const actual = isEmpty(true);
  expect(actual).toBeFalsy();
});

test('boolean false', () => {
  const actual = isEmpty(false);
  expect(actual).toBeFalsy();
});

test('string value', () => {
  const actual = isEmpty('a');
  expect(actual).toBeFalsy();
});

test('Array with value', () => {
  const actual = isEmpty([true]);
  expect(actual).toBeFalsy();
});

test('Number', () => {
  const actual = isEmpty(1);
  expect(actual).toBeFalsy();
});

test('Zero', () => {
  const actual = isEmpty(0);
  expect(actual).toBeFalsy();
});

test('Date', () => {
  const actual = isEmpty(new Date());
  expect(actual).toBeFalsy();
});

test('Function', () => {
  const actual = isEmpty(isEmpty);
  expect(actual).toBeFalsy();
});

