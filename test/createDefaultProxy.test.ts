import { createDefaultProxy } from '../src/createDefaultProxy';

test('Simple', () => {
  const target = {
    name: 'John'
  };
  const proxy = createDefaultProxy(target, 'Unknown');
  expect(proxy.name).toBe('John');
  expect((proxy as Record<string, string>).title).toBe('Unknown');
});
