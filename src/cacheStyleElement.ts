import { createElementWithAttributes } from './createElementWithAttributes';

const cache = new Set<string>();

export function cacheStyleElement(id: string, styles: string) {
  if (cache.has(id)) {
    return;
  }

  const el = createElementWithAttributes('style', { id });
  el.innerHTML = `\n${ styles }\n`;
  document.head.appendChild(el);

  cache.add(id);
}
