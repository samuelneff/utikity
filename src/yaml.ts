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

// Unable to import yaml's own Replacer or Reviver declarations
export type Replacer = any[] | ((key: any, value: any) => unknown);
export type Reviver = (key: unknown, value: unknown) => unknown;

export type YamlParseOptions = ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions & {
  copyAliases?: boolean;
};

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
 * Stringify a value as a YAML document.
 *
 * @param replacer - A replacer array or function, as in `JSON.stringify()`
 * @returns Will always include `\n` as the last character, as is expected of YAML documents.
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

