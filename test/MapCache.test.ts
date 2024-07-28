import { MapCache } from '../src/MapCache';

beforeEach(() => {
  jest.runAllTimers();
});
afterAll(() => {
  jest.runAllTimers();
});

test('simple cache.getOrSet', () => {

  const cache = new MapCache<object, object>();
  const aItem = {};
  const bItem = {};
  const cItem = {};
  const neverItem = {};

  const aKey = {};
  const bKey = {};
  const cKey = {};

  const a1 = cache.getOrSet(aKey, () => aItem);
  expect(cache.size).toBe(1);
  expect(a1).toBe(aItem);

  const a2 = cache.getOrSet(aKey, () => neverItem);
  expect(cache.size).toBe(1);
  expect(a2).toBe(aItem);

  const b1 = cache.getOrSet(bKey, () => bItem);
  expect(cache.size).toBe(2);
  expect(b1).toBe(bItem);

  const b2 = cache.getOrSet(bKey, () => neverItem);
  expect(cache.size).toBe(2);
  expect(b2).toBe(bItem);

  const c1 = cache.getOrSet(cKey, () => cItem);
  expect(cache.size).toBe(3);
  expect(c1).toBe(cItem);

  const c2 = cache.getOrSet(cKey, () => neverItem);
  expect(cache.size).toBe(3);
  expect(c2).toBe(cItem);

  const a3 = cache.getOrSet(aKey, () => neverItem);
  expect(cache.size).toBe(3);
  expect(a3).toBe(aItem);

  const b3 = cache.getOrSet(bKey, () => neverItem);
  expect(cache.size).toBe(3);
  expect(b3).toBe(bItem);

  const c3 = cache.getOrSet(cKey, () => neverItem);
  expect(cache.size).toBe(3);
  expect(c3).toBe(cItem);
});

test('caches are independent', () => {

  const cache1 = new MapCache<object, object>();
  const cache2 = new MapCache<object, object>();

  const a1Item = {};
  const b1Item = {};
  const c1Item = {};

  const a2Item = {};
  const b2Item = {};
  const c2Item = {};
  const neverItem = {};

  const aKey = [] as string[];
  const bKey = [] as string[];
  const cKey = [] as string[];

  const a1 = cache2.getOrSet(aKey, () => a1Item);
  const b1 = cache2.getOrSet(bKey, () => b1Item);
  const c1 = cache2.getOrSet(cKey, () => c1Item);

  const a2 = cache1.getOrSet(aKey, () => a2Item);
  const b2 = cache1.getOrSet(bKey, () => b2Item);
  const c2 = cache1.getOrSet(cKey, () => c2Item);

  expect(cache2.size).toBe(3);
  expect(cache1.size).toBe(3);
  expect(a1).toBe(a1Item);
  expect(b1).toBe(b1Item);
  expect(c1).toBe(c1Item);

  expect(a2).toBe(a2Item);
  expect(b2).toBe(b2Item);
  expect(c2).toBe(c2Item);

  const a3 = cache2.getOrSet(aKey, () => neverItem);
  const b3 = cache2.getOrSet(bKey, () => neverItem);
  const c3 = cache2.getOrSet(cKey, () => neverItem);

  const a4 = cache1.getOrSet(aKey, () => neverItem);
  const b4 = cache1.getOrSet(bKey, () => neverItem);
  const c4 = cache1.getOrSet(cKey, () => neverItem);

  expect(a3).toBe(a1Item);
  expect(b3).toBe(b1Item);
  expect(c3).toBe(c1Item);

  expect(a4).toBe(a2Item);
  expect(b4).toBe(b2Item);
  expect(c4).toBe(c2Item);

});

test('setTagFunctionCacheSize', () => {

  const cache = new MapCache<object, object>();

  for (let i = 0; i < 100; i++) {
    const wk = {};
    cache.getOrSet(wk, () => ({}));
    cache.getOrSet(wk, () => ({}));
  }
  expect(cache.size).toBe(100);

  cache.capacity = 20;

  // doesn't take effect till next frame
  expect(cache.size).toBe(100);

  jest.runAllTimers();

  // now reduced to 60% of cache size = 20 * 0.6 = 12
  expect(cache.size).toBe(12);
});

test('reduceCache only used once', () => {
  const cache = new MapCache<object, object>();

  // 10 items used twice so kept
  for (let i = 0; i < 10; i++) {
    const ck = [] as string[];
    cache.getOrSet(ck, () => ({}));
    cache.getOrSet(ck, () => ({}));
  }
  // 100 items used only once so automatically cleared from cache
  for (let i = 0; i < 100; i++) {
    const ck = [] as string[];
    cache.getOrSet(ck, () => ({}));
  }

  cache.capacity = 20;
  expect(cache.size).toBe(110);

  jest.runAllTimers();

  expect(cache.size).toBe(10); // all items used more than once
});

test('reduceCache only by last used', () => {
  const cache = new MapCache<object, object>();
  const neverItem = {};
  const items = [];
  const keys = [] as object[];

  // create 88 older ones that'll get purged from cache
  for (let i = 0; i < 88; i++) {
    jest.setSystemTime(100000 + i);
    const key = {};
    cache.getOrSet(key, () => neverItem);
    cache.getOrSet(key, () => neverItem);
  }

  // now we'll create 12 that we'll keep
  for (let i = 0; i < 12; i++) {
    jest.setSystemTime(100100 + i);
    const key = [] as string[];
    const item = {};
    keys.push(key);
    items.push(item);
    cache.getOrSet(key, () => item);
    cache.getOrSet(key, () => item);
  }

  expect(cache.size).toBe(100);

  cache.capacity = 20;

  jest.runAllTimers();

  expect(cache.size).toBe(12);

  for (let i = 0; i < items.length; i++) {
    const key = keys[ i ];
    const item = items[ i ];

    const cached = cache.getOrSet(key, () => neverItem);
    expect(cached).toBe(item);
  }
});

test('reduceCache used once and last used', () => {
  const cache = new MapCache<object, object>();
  const neverItem = {};
  const funcs = [] as object[];
  const keys = [] as object[];

  // create 70 older ones that'll get purged from cache because they're older
  for (let i = 0; i < 70; i++) {
    jest.setSystemTime(100000 + i);
    const key = [] as string[];
    cache.getOrSet(key, () => neverItem);
    cache.getOrSet(key, () => neverItem);
  }

  // now we'll create 12 that we'll keep
  for (let i = 0; i < 12; i++) {
    jest.setSystemTime(100100 + i);
    const key = [] as string[];
    const item = {};
    keys.push(key);
    funcs.push(item);
    cache.getOrSet(key, () => item);
    cache.getOrSet(key, () => item);
  }

  // and create 18 that will get purged because they're only used once even though they're newer
  for (let i = 0; i < 18; i++) {
    jest.setSystemTime(100200 + i);
    const key = [] as string[];
    cache.getOrSet(key, () => neverItem);
  }


  expect(cache.size).toBe(100);

  cache.capacity = 20;

  jest.runAllTimers();

  expect(cache.size).toBe(12);

  for (let i = 0; i < funcs.length; i++) {
    const key = keys[ i ];
    const Item = funcs[ i ];

    const cached = cache.getOrSet(key, () => neverItem);
    expect(cached).toBe(Item);
  }
});

test('entries', () => {
  const cache = new MapCache<number, string>();

  cache.set(1, 'a');
  cache.set(2, 'b');
  cache.set(3, 'c');

  const actual = [];

  for (const entry of cache.entries()) {
    actual.push(entry);
  }

  const expected = [
    [ 1, 'a' ],
    [ 2, 'b' ],
    [ 3, 'c' ],
  ];

  expect(actual).toEqual(expected);
});

test('values', () => {
  const cache = new MapCache<number, string>();

  cache.set(1, 'a');
  cache.set(2, 'b');
  cache.set(3, 'c');

  const actual = [];

  for (const entry of cache.values()) {
    actual.push(entry);
  }

  const expected = [
    'a',
    'b',
    'c',
  ];

  expect(actual).toEqual(expected);
});
