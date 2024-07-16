import { createEntityEncodeProxy } from '../src/createEntityEncodeProxy';

test('Undefined target', () => {
  const actual = createEntityEncodeProxy(undefined);
  expect(actual).toBeUndefined();
});

test('Null target', () => {
  const actual = createEntityEncodeProxy(null);
  expect(actual).toBeNull();
});

test('Function target', () => {
  function target() {
    return 'mno';
  }
  const actual = createEntityEncodeProxy(target);
  expect(actual()).toBe('mno');
});

createIdentityTest('Undefined value', undefined);
createIdentityTest('Null value', null);
createIdentityTest('Number value', 123);
createIdentityTest('Boolean value', true);
createIdentityTest('Date value', new Date());
createIdentityTest('String value (without entities)', 'abc');
createIdentityTest('Function value', function testFunc() { });
createIdentityTest('Object value', { testProp: 'def' });
createIdentityTest('Array value', [ 'ghi' ]);

test('With entities', () => {
  const target = {
    value: '<em>John & Jane</em>'
  };
  const proxy = createEntityEncodeProxy(target);
  const actual = proxy.value;
  expect(actual).toBe('&lt;em&gt;John &amp; Jane&lt;/em&gt;');
});

test('Object.assign still works', () => {
  const target = {
    value: 'jkl'
  };
  const proxy = createEntityEncodeProxy(target);
  const actual = Object.assign(proxy, { other: 'pqr' });
  expect(actual).toEqual(
    {
      value: 'jkl',
      other: 'pqr',
    }
  );
});

test('Object.entries still works', () => {
  const target = {
    value: 'tuv'
  };
  const proxy = createEntityEncodeProxy(target);
  const actual = Object.entries(proxy);
  expect(actual).toEqual([ ['value', 'tuv']]);
});

test('Assignment applies to target', () => {
  const target: Record<string, string> = {
    value: 'wxy'
  };
  const proxy = createEntityEncodeProxy(target);
  proxy.actual = 'zzz';
  expect(target.actual).toEqual('zzz');
});

test('Assigned value gets entity encoded', () => {
  const target: Record<string, string> = {
  };
  const proxy = createEntityEncodeProxy(target);
  proxy.value = '<em>John & Jane</em>';
  const actual = proxy.value;
  expect(actual).toBe('&lt;em&gt;John &amp; Jane&lt;/em&gt;');
});

function createIdentityTest(name: string, value: unknown) {
  test(name, () => {
    const target = {
      value
    };
    const proxy = createEntityEncodeProxy(target);
    const actual = proxy?.value;
    expect(actual).toBe(value);
  });
}
