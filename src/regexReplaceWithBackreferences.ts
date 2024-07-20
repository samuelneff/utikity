import { toRecord } from './toRecord';

/**
 * @hidden
 */
export function regexReplaceWithBackreferences(source: string, regex: RegExp, replacement?: string): string {

  const replacer = replacement === undefined
    ? backReferenceReplacerWithDefaults
    : backReferenceReplacerWithReplacement;

  return source.replace(regex, replacer);

  function backReferenceReplacerWithReplacement(_found: string, ...backrefs: string[]): string {
    const backrefLookup = toRecord(
      backrefs,
      (_, index) => (index + 1).toString()
    );

    return replacement!.replace(/\$(\d+)/g, backReferenceLookupReplacer);

    function backReferenceLookupReplacer(_backref: string, index: string) {
      return backrefLookup[ index ] ?? '';
    }
  }
}

function backReferenceReplacerWithDefaults(
  _found: string,
  backrefs: string
): string {
  return backrefs;
}
