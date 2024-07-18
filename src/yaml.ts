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
 * Replacer function definition from [yaml](https://www.npmjs.com/package/yaml) but their's is not exported for some reason. Matches the
 * {@link JSON.stringify()} definition.
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
 * @see [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
 */
export type Replacer = any[] | ((key: any, value: any) => unknown);
/**
 * Reviver function definition from {@link https://www.npmjs.com/package/yaml|yaml} but their's is not exported for
 * some reason. Matches the {@link JSON.parse()} definition.
 * @see {@link !JSON.parse}
 * @see {yamlParse}
 */
export type Reviver = (key: unknown, value: unknown) => unknown;

/**
 * Parse option from {@link https://www.npmjs.com/package/yaml|yaml} with additional option regarding copying aliases,
 * as opposed to preserving references.
 */
export type YamlParseOptions = ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions & {
  /**
   * When specified, aliases are parsed as copied objects instead of references to an object. Be careful though,
   * circular references could create endless loops and will be copied to a depth of 100.
   */
  copyAliases?: boolean;
};

/**
 * Parses a YAML string into an object. Wrapper for `{@link https://www.npmjs.com/package/yaml|yaml}.parse()` from
 * with added functionality to copy aliases instead of creating objects with internal references.
 */
export function yamlParse(yamlText: string, options?: YamlParseOptions): unknown;
export function yamlParse(yamlText: string, reviver: Reviver, options?: YamlParseOptions): unknown;
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
 * Converts an object to a YAML string with added functionality to stringify {Error} objects as plain objects.
 *
 * @param replacer - A replacer array or function, as in {JSON.stringify}
 * @returns YAML string. It will always include `\n` as the last character, as is expected of YAML documents.
 */
export function yamlStringify(
  value: any,
  options?: DocumentOptions &
    SchemaOptions &
    ParseOptions &
    CreateNodeOptions &
    ToStringOptions,
): string;
export function yamlStringify(
  value: any,
  replacer?: Replacer | null,
  options?:
    | string
    | number
    | (DocumentOptions &
        SchemaOptions &
        ParseOptions &
        CreateNodeOptions &
        ToStringOptions),
): string;
export function yamlStringify(value: any, arg2?: any, arg3?: any) {
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

