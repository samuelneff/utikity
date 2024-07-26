import { hasValue } from '../src/hasValue';

test('String true', () => {
  expect(hasValue('String')).toBeTruthy();
});

test('Number true', () => {
  expect(hasValue(0)).toBeTruthy();
});

test('Boolean true', () => {
  expect(hasValue(false)).toBeTruthy();
});

test('Object true', () => {
  expect(hasValue({ a: 'A' })).toBeTruthy();
});

test('Array true', () => {
  expect(hasValue([ 'a' ])).toBeTruthy();
});

test('Map true', () => {
  expect(hasValue(new Map([ ['a', 'A'] ]))).toBeTruthy();
});

test('Set true', () => {
  expect(hasValue(new Set([ 'a' ]))).toBeTruthy();
});

test('String false', () => {
  expect(hasValue('')).toBeFalsy();
});

test('NaN false', () => {
  expect(hasValue(Number.NaN)).toBeFalsy();
});

test('Object false', () => {
  expect(hasValue({})).toBeFalsy();
});

test('Array false', () => {
  expect(hasValue([])).toBeFalsy();
});

test('Map false', () => {
  expect(hasValue(new Map())).toBeFalsy();
});

test('Set false', () => {
  expect(hasValue(new Set())).toBeFalsy();
});
