export const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
};
export const entitiesPattern = new RegExp(`[${ Object.keys(entityMap).join('') }]`, 'g');

export function entityEncode(text: string | undefined) {
  return text
    ? String(text).replace(entitiesPattern, entityEncodeChar)
    : '';

  function entityEncodeChar(entity: string) {
    return entityMap[ entity as keyof typeof entityMap ];
  }
}
