// https://stackoverflow.com/a/49683575/118703

/**
 * Utility type prepresenting the optional properties of `T`.
 * @see {@link Spread}
 */
export type OptionalPropertyNames<T> =
  { [ K in keyof T ]-?: ({} extends { [ P in K ]: T[ K ] } ? K : never) }[ keyof T ];

type SpreadProperties<L, R, K extends keyof L & keyof R> =
  { [ P in K ]: L[ P ] | Exclude<R[ P ], undefined> };

type Id<T> = T extends infer U ? { [ K in keyof U ]: U[ K ] } : never;

type SpreadTwo<L, R> = Id<
  & Pick<L, Exclude<keyof L, keyof R>>
  & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
  & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
  & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

/**
 * Utility type to merge the types of all type parameters as one type.
 *
 * @example
 * function merge<T extends object[]>(...args: T): Spread<T> {
 *   return Object.assign({}, ...args);
 * }
 *
 * const a = { a: 'A' };
 * const b = { b: 'B' };
 * const c = { c: 'C' };
 * const d = { d: 'D' };
 *
 * // Object.assign with 5 or more parameters results in an `any` type
 * const x = Object.assign({}, a, b, c, d);
 *
 * // Our `merge` implementation uses Spread<> so the result here is fully typed
 * const y = merge(a, b, c, d);
 *
 * expect(x).toEqual(y);
 *
 * @see {@link createMultiProxy}
 * @see Credit to [jcalz](https://stackoverflow.com/users/2887218/jcalz) on [Stack Overflow](https://stackoverflow.com/a/49683575/118703)
 */
export type Spread<A extends readonly [ ...any ]> = A extends [ infer L, ...infer R ] ?
  SpreadTwo<L, Spread<R>> : unknown;

