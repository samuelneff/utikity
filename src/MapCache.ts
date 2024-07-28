
interface CachedItem<T> {
  lastUsed: number;
  usedCount: number;
  value: T;
}

/**
 * Cache of key/value pairs that tracks last usage and purges items from the cache when it grows beyond capacity. The
 * backing store is a {@link !Map} and all identically named methods and properties behave as those in `Map`. The
 * {@link get} method additionally tracks usage and {@link set} method schedules a cache purge when needed. The extra
 * method {@link getOrSet} and property {@link capacity} are specific to this cache.
 *
 * @example
 * // At it's core the cache acts just like a Map
 * const cache = new MapCache<number, string>();
 * cache.set(1, 'a');
 * cache.set(2, 'b');
 * expect(cache.get(1)).toBe('a');
 * expect(cache.get(2)).toBe('b');
 *
 * @example
 * // If we add a lot of items, then they'll be purged from the cache after a frame
 * const cache = new MapCache<number, string>();
 *
 * for(let i=0; i<1000; i++) {
 *   cache.set(i, '');
 * }
 *
 * // Mimic the next frame so the cache purges
 * jest.runAllTimers();
 *
 * // the default cache size is 100 so our cache will be smaller than that. See `capacity` for a complete explanation.
 * expect(cache.size).toBeLessThan(100);
 *
 * @example
 * // Now let's check out creator functionality to conditionally create values only when needed
 * const cache = new MapCache<number, string>();
 *
 * let createCount = 0;
 * function create() {
 *   return ++createCount;
 * }
 *
 * for (let i=0; i<10) {
 *   const actual = cache.getOrSet(i, create);
 *   expect(actual).toBe(i + 1); // create count is 1 based
 * }
 * // We've called it 10 times with a unique key, so create got called 10 times
 * expect(createCount).toBe(10);
 *
 * // Now let's call it again with the same 10 keys
 * for(let i=0; i<10; i++) {
 *   const actual = cache.getOrSet(i, create);
 *   expect(actual).toBe(i + 1); // create here is not called, so we have the same 1-10 values
 * }
 *
 * // The create count is still only 10 since calls 11-20 were keys that already existed
 * expect(createCount).toBe(10);
 */
export class MapCache<TKey, TValue> {

  private cache = new Map<TKey, CachedItem<TValue>>();
  private internalCapacity: number;
  private purgeTimeout: NodeJS.Timeout | undefined;

  constructor(initialCapacity: number = 100) {
    this.internalCapacity = initialCapacity;
  }

  /**
   * Returns the corresponding value from the cache if it exists and updates usage which is one factor in purging
   * the cache--both used count and last used time.
   */
  get(key: TKey) {
    const cachedItem = this.cache.get(key);
    if (cachedItem) {
      cachedItem.usedCount++;
      cachedItem.lastUsed = Date.now();
      return cachedItem.value;
    }
    return undefined;
  }

  /**
   * Returns the value of the item, and updates usage, if the `key` already exists in the cache. If it doesn't exist
   * then `creator` is called and the newly created value is put in the cache and returned. `creator` is only called
   * if the `key` is not already in the cache.
   */
  getOrSet(key: TKey, creator: () => TValue) {
    if (this.internalCapacity === 0) {
      return creator();
    }

    const cachedValue = this.get(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    const value = creator();
    return this.set(key, value);
  }

  /**
   * Adds an item to the cache, or overwrites the item if it already exists, and re-initializes usage back to
   * the current time and a single usage.
   */
  set(key: TKey, value: TValue) {
    this.cache.set(
      key,
      {
        usedCount: 1,
        lastUsed: Date.now(),
        value,
      },
    );

    this.maybeScheduleReduction();

    return value;
  }

  /**
   * Returns the capacity of the cache--the size allowed in the cache before a purge is scheduled.
   */
  get capacity() {
    return this.internalCapacity;
  }

  /**
   * Updates the size at which a purge is scheduled. The cache can grow larger than `capacity` within a single frame
   * since the purge is performed on the next frame. When a purge is performed all items that have been used only
   * once are purged regardless of when they were used. If the cache is still over capacity then the oldest items
   * are purged until the cache is at 60% of capacity. This buffer allows recently used items to remain in the cache
   * while reducing the need to perform frequent purges. Setting `capacity` to zero disables caching.
   */
  set capacity(newCapacity: number) {
    this.internalCapacity = Math.max(newCapacity, 0);
    this.maybeScheduleReduction();
  }

  get size() {
    return this.cache.size;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: TKey) {
    return this.cache.delete(key);
  }

  entries() {
    const cacheEntries = this.cache.entries();

    const iterator = {
      [ Symbol.iterator ]: () => ({
        next: () => {
          const { done, value } = cacheEntries.next();
          if (done) {
            return { done };
          }
          const [ key, cacheItem ] = value;
          return { value: [ key, cacheItem.value ], done: false };
        }
      })
    };

    return iterator;
  }

  has(key: TKey) {
    return this.cache.has(key);
  }

  keys() {
    return this.cache.keys();
  }

  values() {
    const cacheValues = this.cache.values();

    const iterator = {
      [ Symbol.iterator ]: () => ({
        next: () => {
          const { done, value } = cacheValues.next();
          if (done) {
            return { done };
          }
          return { value: value.value, done: false };
        }
      })
    };

    return iterator;
  }

  private maybeScheduleReduction() {
    if (this.cache.size <= this.internalCapacity || this.purgeTimeout) {
      return;
    }
    this.purgeTimeout = setTimeout(() => this.purge());
  }

  private purge() {
    clearTimeout(this.purgeTimeout);
    this.purgeTimeout = undefined;

    if (this.internalCapacity === 0) {
      this.cache.clear();
      return;
    }

    if (this.cache.size < this.internalCapacity) { // can happen if a reduction is scheduled and then cache size changes
      return;
    }

    const targetCacheSize = Math.floor(this.internalCapacity * 0.6);

    const entries = [ ...this.cache.entries() ]
      .filter(
        ([ _, item ]) => item.usedCount > 1
      );

    if (entries.length > targetCacheSize) {
      entries.sort(
        ([ , x ], [ , y ]) => y.lastUsed - x.lastUsed
      );
      entries.length = targetCacheSize;
    }

    this.cache = new Map(entries);
  }
}