export const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
};
/**
 * Regular expression of the five characters needing encoding within HTML and XML.
 */
export const entitiesPattern = new RegExp(`[${ Object.keys(entityMap).join('') }]`, 'g');

/**
 * Given a string returns the entity-encoded version of that string replacing characters
 * that need entity-encoding in HTML and XML as entities.
 *
 * @example
 * const input = `<a href="https://example.com">John & O'Sullivan</a>`;
 * const expected = '&lt;a href=&quot;https://example.com&quot;&gt;John &amp; O&apos;Sullivan&lt;/a&gt;';
 * const actual = entityEncode(input);
 *
 * expect(actual).toBe(expected);
 */
export function entityEncode(text: string | undefined) {
  return text
    ? String(text).replace(entitiesPattern, entityEncodeChar)
    : '';

  function entityEncodeChar(entity: string) {
    return entityMap[ entity as keyof typeof entityMap ];
  }
}
