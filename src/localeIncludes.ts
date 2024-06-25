/**
 * Case-insensitive base-character check if text contains with a specific substring, optionally at a specific position.
 */
export function localeIncludes(
  text: string,
  substring: string,
  index?: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.CollatorOptions
) {

  if (index === undefined || index < 0) {
    return localeIncludesAnywhere(
      text,
      substring,
      locales,
      options
    );
  }

  const len = substring.length;
  const appliedOptions = options ?? {
    sensitivity: 'base'
  };

  for (let i = 0; i < len; i++) {
    const textChar = text[ i + index ];
    const subChar = substring[ i ];
    if (textChar === subChar) {
      continue;
    }
    if (textChar.localeCompare(subChar, locales, appliedOptions) !== 0) {
      return false;
    }
  }

  return true;
}

function localeIncludesAnywhere(
  text: string,
  substring: string,
  locales: Intl.LocalesArgument | undefined,
  options: Intl.CollatorOptions | undefined
) {
  const len = text.length - substring.length + 1;

  for (let i = 0; i < len; i++) {
    if (localeIncludes(
      text,
      substring,
      i,
      locales,
      options
    )) {
      return true;
    }
  }

  return false;
}
