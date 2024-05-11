import { escapeRegExp } from 'lodash';

export interface ReplacePlaceholderArgs {
  text: string;
  placeholders: Record<string, unknown>;
  markerPrefix?: string;
  markerSuffix?: string;
}
export function replacePlaceholers({
  text,
  placeholders,
  markerPrefix = '$',
  markerSuffix = ''
}: ReplacePlaceholderArgs) {

  const placeholderKeysAsPattern = Object.keys(placeholders)
    .map(escapeRegExp)
    .join('|');

  const placeholderRegExp = new RegExp(
    `${ escapeRegExp(markerPrefix) }(${ placeholderKeysAsPattern })${ escapeRegExp(markerSuffix) }`,
    'g'
  );

  return text.replaceAll(placeholderRegExp, replaceOnePlaceholder);

  function replaceOnePlaceholder(_: string, placeholder: string) {
    return String(placeholders[ placeholder ] ?? '');
  }
};


