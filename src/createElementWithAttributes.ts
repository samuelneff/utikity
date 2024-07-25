import { safeObjectEntries } from './safeObjectEntries';

export function createElementWithAttributes<
  TTag extends keyof HTMLElementTagNameMap | string,
  TElement = TTag extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ TTag ] : HTMLElement
>(
  tagName: TTag,
  attributes: Record<string, string>,
): TElement;
export function createElementWithAttributes<
  TTag extends keyof HTMLElementTagNameMap | string,
  TElement = TTag extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ TTag ] : HTMLElement
>(
  tagName: TTag,
  attributes: Map<string, string>,
): TElement;

/**
 * Given the name of an element and a Record of attributes, creates the element and returns it. It is not
 * added ot the DOM; the caller must do that.
 *
 * @example
 *
 * const element = createElementWithAttributes(
 *   'a',
 *   {
 *     href: 'http://example.com'
 *   }
 * );
 * element.innerHTML = 'Click this link';
 * document.body.appendChild(element);
 *
 * @see {@link createCssAnimation}
 */
export function createElementWithAttributes<
  TTag extends keyof HTMLElementTagNameMap | string,
  TElement = TTag extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ TTag ] : HTMLElement
>(
  tagName: TTag,
  attributes: any,
): TElement {
  const el = document.createElement(tagName) ;
  safeObjectEntries(attributes).forEach(
    ([name, value]) => el.setAttribute(String(name), String(value))
  )
  return el as TElement;
}