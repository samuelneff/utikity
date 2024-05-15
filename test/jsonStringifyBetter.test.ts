import { jsonStringifyBetter, predefinedRuntimeEnvironments, runtimeEnvironment } from '../src';

beforeAll(() => {
  runtimeEnvironment(predefinedRuntimeEnvironments.unknown);
});

test('plain object', () => {
  const actual = jsonStringifyBetter({ a: 'alpha' });
  expect(actual).toEqual(`{"a":"alpha"}`);
});

test('map', () => {
  const actual = jsonStringifyBetter(new Map([ [ 'a', 'alpha' ] ]));
  expect(actual).toEqual(`{"a":"alpha"}`);
});

test('set', () => {
  const actual = jsonStringifyBetter(new Set(['a', 'alpha']));
  expect(actual).toEqual(`["a","alpha"]`);
});

test('circular to root', () => {
  const circularRoot = { a: { b: null as unknown } };
  circularRoot.a.b = circularRoot;

  const actual = jsonStringifyBetter(circularRoot);
  expect(actual).toEqual(`{"a":{"b":null}}`);
});

test('circular to parent', () => {
  const circularRoot = { a: { b: null as unknown } };
  circularRoot.a.b = circularRoot.a;

  const actual = jsonStringifyBetter(circularRoot);
  expect(actual).toEqual(`{"a":{"b":null}}`);
});

test('circular map', () => {
  const circularRoot = {a: new Map()};

  circularRoot.a.set('b', circularRoot);

  const actual = jsonStringifyBetter(circularRoot);
  expect(actual).toEqual(`{"a":{"b":null}}`);
});
