import { isObject } from 'lodash';
import { doSafely } from './doSafely';
import { fastMaybeParseDateString } from './fastMaybeParseDateString';
import { isDefined } from './isDefined';
import { isFunction } from './isFunction';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isNullUndefinedOrEmpty } from './isNullUndefinedOrEmpty';
import {
  isScalar,
  parse,
  stringify,
  type CreateNodeOptions,
  type DocumentOptions,
  type ParseOptions,
  type SchemaOptions,
  type ToJSOptions,
  type ToStringOptions
} from 'yaml';

/**
 * Type representing any valid type that can be converted to or from a YAML string.
 * @see {@link yamlParse}
 */
export type YamlObject = object | unknown[] | string | number | boolean | Date;

/**
 * Replacer function definition from [npm!yaml] but their's is not exported for some reason. Matches the
 * {@link !JSON.stringify} definition.
 *
 * @example
 * // Replacer defined here
 * function forceAllNumbersToStrings(_key: unknown, value: unknown) {
 *   return typeof value === 'number'
 *     ? String(value)
 *     : value;
 * }
 * const input = {
 *   'string': 'ABC',
 *   'number': 123,
 * };
 *
 * // Replacer used here
 * const actual = yamlStringify(input, forceAllNumbersToStrings);
 *
 * const expected = `
 *   string: ABC
 *   number: 456;
 * `;
 * expect(actual).toEqualIgnoringWhitespace(expected);
 *
 * @see {@link yamlStringify}
 * @see {@link !JSON.stringify}
 */
export type Replacer = any[] | ((key: any, value: any) => unknown);

/**
 * Reviver function definition from [npm!yaml]. Only exported because the original is not, I'm not sure why.
 * Matches the {@link !JSON.parse} definition.
 *
 * @example
 * // Reviver defined here
 * function piToNumber(key: unknown, value: unknown) {
 *   if (key === 'pi') {
 *     return 3.14159265359;
 *   }
 *   return value;
 * }
 *
 * const yaml = 'value: pi';
 *
 * // Reviver used here
 * const actual = yamlParse(yaml, piToNumber);
 * const expected = { value: 3.14159265359 };
 *
 * expect(actual).toEqual(expected);
 *
 * @see {@link yamlParse}
 * @see {@link !JSON.parse}
 */
export type Reviver = (key: unknown, value: unknown) => unknown;

/**
 * Parse option from [npm!yaml] with additional option for copying aliases, as opposed to preserving references.
 *
 * @see {@link yamlParse}
 */
export type YamlParseOptions = ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions & {
  /**
   * When specified, aliases are parsed as copied objects instead of references to an object. Be careful though,
   * circular references could create endless loops and will be copied to a depth of 100.
   */
  copyAliases?: boolean;
};

export function yamlParse(yamlText: string, options?: YamlParseOptions): YamlObject;
export function yamlParse(yamlText: string, reviver: Reviver, options?: YamlParseOptions): YamlObject;
/**
 * Parses a [YAML](https://yaml.org/) string into an object. Wrapper for [npm!yaml]'s `parse` method
 * with added functionality to copy aliases instead of creating objects with internal references.
 *
 * @example
 * // Simple example with a small object
 *
 * const yaml = `
 *   key: This is a string
 *   value: 123
 * `;
 * const expected = {
 *   key: 'This is a string',
 *   value: 123,
 * };
 * const actual = yamlParse(yaml);
 *
 * expect(actual).toEqual(expected);
 *
 * @example
 * // Example with an alias.
 *
 * const yaml = `
 *   - source: &alias
 *       key: value
 *   - target: *alias
 * `;
 * const expected = {
 *   source: {
 *     key: 'value',
 *   },
 *   target: {
 *     key: 'value',
 *   },
 * };
 * const actual = yamlParse(yaml);
 *
 * expect(actual).toEqual(expected);
 *
 * // This is the key difference from stock yaml,
 * // the alias is rehydrated as a copy, not a reference.
 * expect(actual.source).not.toBe(actual.target);
 *
 * @see {@link yamlStringify}
 */
export function yamlParse(
  yamlText: string,
  reviverOrOptions?: Reviver | YamlParseOptions,
  maybeOptions?: YamlParseOptions
) {

  let reviver: Reviver = yamlParseStandardReviver;
  let options: YamlParseOptions | undefined = undefined;

  if (isFunction(reviverOrOptions)) {
    reviver = (key, value) => yamlParseStandardReviver(
      key,
      reviverOrOptions(key, value)
    );
    options = maybeOptions;
  } else if (isDefined(reviverOrOptions) || typeof reviverOrOptions === 'object') {
    options = reviverOrOptions;
  }

  let obj = parse(yamlText, reviver, options);

  if (options?.copyAliases !== false) {
    obj = copyAliases(obj, new Map());
  }

  return obj;
}

function yamlParseStandardReviver(_key: unknown, value: unknown) {
  return fastMaybeParseDateString(value);
}

function copyAliases(obj: any, foundObjects: Map<unknown, number>) {
  if (isNullOrUndefined(obj) || isScalar(obj)) {
    return obj;
  }

  for (const [ key, value ] of Object.entries(obj)) {
    if (!isObject(value)) {
      continue;
    }
    const found = foundObjects.get(value);
    if (!found) {
      foundObjects.set(value, 1);
      obj[ key ] = copyAliases(value, foundObjects);
      continue;
    }

    if (found > 100) {
      // this object had too many references to itself
      obj[ key ] = null;
      continue;
    }

    foundObjects.set(value, found + 1);
    const shallowCopy = Array.isArray(value)
      ? [ ...value ]
      : { ...value };

    obj[ key ] = copyAliases(shallowCopy, foundObjects)
  }

  return obj;
}

/**
 * Stringify options from [npm!yaml]. Exported for brevity only.
 *
 * @see {@link yamlStringify}
 */
export type YamlStringifyOptions =
  | string
  | number
  | (DocumentOptions &
    SchemaOptions &
    ParseOptions &
    CreateNodeOptions &
    ToStringOptions);

export function yamlStringify(value: unknown, options?: YamlStringifyOptions): string;
export function yamlStringify(value: unknown, replacer?: Replacer | null, options?: YamlStringifyOptions): string;
/**
 * Converts an object to a YAML string with added functionality to stringify {@link !Error} objects as plain objects.
 *
 * @example
 * // Simple example with two keys
 *
 * const obj = {
 *   key: 'This is a string',
 *   value: 123,
 * };
 * const expected = `
 *   key: This is a string
 *   value: 123
 * `;
 * const actual = yamlStringify(yaml);
 *
 * expect(actual).toEqualIgnoringWhitespace(expected);
 *
 * @example
 * // Example with an Error which normally would be excluded from the output.
 *
 * const obj = {
 *   error: new Error('This is an error'),
 * };
 * const expected = `
 *   error:
 *     message: This is an error
 * `;
 * const actual = yamlStringify(yaml);
 *
 * expect(actual).toEqualIgnoringWhitespace(expected);
 *
 * @see {@link yamlParse}
 */
export function yamlStringify(value: unknown, arg2?: any, arg3?: any) {
  let replacer: (key: string, value: unknown) => unknown;

  if (isFunction(arg2)) {
    replacer = (key: string, value: unknown) => standardReplacer(key, arg2(key, value))
  } else {
    replacer = standardReplacer;
    arg3 = arg2;
  }

  return stringify(value, replacer, arg3);
}

function standardReplacer(_key: string, value: unknown): unknown {
  if (isFunction(value)) {
    return value.name;
  }

  if (value instanceof Error) {
    const { stack } = value;
    if (isNullUndefinedOrEmpty(stack)) {
      return String(value);
    }

    const errAsObj = { stack } as Record<string, unknown>;
    Object.getOwnPropertyNames(value).forEach(key => {
      doSafely(
        () => errAsObj[ key ] = (value as any)[ key ]
      );
    });
    return errAsObj;
  }

  return value;
}

