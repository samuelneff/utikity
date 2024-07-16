import { entityEncode } from '../src/entityEncode';

test('None', () => {
  const actual = entityEncode('test');
  expect(actual).toBe('test');
});

test('Undefined', () => {
  const actual = entityEncode(undefined);
  expect(actual).toBe('');
});

test('Number', () => {
  const actual = entityEncode(123 as unknown as string);
  expect(actual).toBe('123');
});

test('None', () => {
  const actual = entityEncode('test');
  expect(actual).toBe('test');
});


test('All of them', () => {
  const actual = entityEncode(`<a href="link">John & O'Hara</a>`);
  expect(actual).toBe(`&lt;a href=&quot;link&quot;&gt;John &amp; O&apos;Hara&lt;/a&gt;`);
});
