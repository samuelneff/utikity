import { createElementWithAttributes } from './createElementWithAttributes';
import { isString } from './isString';

const cache = new Set<string>();

export function cacheStyleElement(id: string, styles: string): void;
export function cacheStyleElement(id: string, styleCreator: () => string): void;

/**
 * Creates a `<style>` element with the provided content and adds it to the document's
 * `<head>`. If the style with the same id has already been created then this is a no-op,
 * even if the style content is different (it isn't created or checked). It's the caller's
 * responsibility to ensure the id is unique for a given content. Using a creator function
 * allows lazy processing that is not run on duplicate calls.
 */
export function cacheStyleElement(id: string, stylesOrStyleCreator: string | (() => string)) {
  if (cache.has(id)) {
    return;
  }

  const styles = isString(stylesOrStyleCreator)
    ? stylesOrStyleCreator
    : stylesOrStyleCreator();

  const el = createElementWithAttributes('style', { id });
  el.innerHTML = `\n${ styles }\n`;
  document.head.appendChild(el);

  cache.add(id);
}
