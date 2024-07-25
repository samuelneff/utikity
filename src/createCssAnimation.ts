import { kebabCase } from 'lodash';
import { isCssLengthProperty } from './isCssLengthProperty';
import { px } from './px';
import { createElementWithAttributes } from './createElementWithAttributes';
import { safeObjectEntries } from './safeObjectEntries';

/**
 * A record of CSS property names and values.
 */
export type CssPropertyMap = Record<string, string | number>;

/**
 * A Map of keyframes and CSS Proprties to set at each keyframe.
 */
export type KeyframeMap = Map<string, CssPropertyMap>;

interface CachedAnimation {
  name: string;
  cssText: string;
}

const keyframesCache = new Map<string, CachedAnimation>();
const animationStylesId = 'create-css-animations';

export function createCssAnimation(...frames: CssPropertyMap[]): string;
export function createCssAnimation(frames: KeyframeMap): string;
export function createCssAnimation(prefix: string, ...frames: Record<string, string | number>[]): string;
export function createCssAnimation(prefix: string, frames: KeyframeMap): string;
/**
 * Creates a `<style>` element defining a new CSS animation for the provided frames, or returns the
 * name of an existing animation that was previously created for the exact same frame definitions.
 *
 * @example
 *
 * const fadeIn = createCssAnimation(
 *   {
 *     opacity: 0
 *   },
 *   {
 *     opacity: 1
 *   }
 * );
 * document.getElementById('test').style.animationName = fadeIn;
 */
export function createCssAnimation(
  ...args:
    | CssPropertyMap[]
    | [ string, ...CssPropertyMap[]]
  | [ KeyframeMap ]
  | [ string, KeyframeMap ]
): string {

  if (args.length == 0) {
    return '';
  }

  let prefix: string = '';

  if (typeof args[ 0 ] === 'string') {
    prefix = args.shift() as string;
  }

  const framesMap: KeyframeMap = args[0] instanceof Map
    ? args[0]
    : createKeyframeMap(args as CssPropertyMap[]);

  const frameEntries = safeObjectEntries(framesMap);
  const condense = frameEntries.every(([ _label, style ]) => Object.keys(style).length < 2);
  const framesText = frameEntries.map(entry => createKeyframe(entry, condense)).join('\n');
  const cacheKey = `${ prefix } :: ${ framesText }`;
  const cached = keyframesCache.get(cacheKey);
  if (cached) {
    return cached.name;
  }

  const name = `${ prefix }${ prefix ? '_' : '' }anim_${ keyframesCache.size + 1 }`;
  const cssText = `@keyframes ${ name } {\n${ framesText }}`;
  keyframesCache.set(
    cacheKey,
    {
      name,
      cssText,
    }
  );

  updateAnimationsInDocument();

  return name;
}

function createKeyframeMap(frames: CssPropertyMap[]) {

  const framesMap: KeyframeMap = new Map();
  const frameCount = frames.length;

  switch (frameCount) {
    case 0:
    case 1:
      throw new Error(`createCssAnimation expected an array of two or more frames but got ${ frameCount }.`);

    case 2:
      framesMap.set('from', frames[ 0 ]);
      framesMap.set('to', frames[ 1 ]);
      break;

    default:
      const perFrame = 100 / (frames.length - 1);
      for (let i = 0; i < frameCount; i++) {
        framesMap.set(`${ Math.round(i * perFrame * 1000) / 10 }%`, frames[ i ]);
      }
      break;
  }

  return framesMap;
}

function createKeyframe([ label, style ]: [ string, CssPropertyMap ], condense: boolean) {

  const stylesText = Object.entries(style).map(createStyleProperty).join('\n    ');
  return condense
    ? `  ${ label } { ${ stylesText } }`
    : `  ${ label } {\n    ${ stylesText }\n  }\n`;
}

function createStyleProperty([ property, value ]: [ string, unknown ]) {
  const valueText = isCssLengthProperty(property) ? px(value) : value;
  return `${ kebabCase(property) }: ${ valueText };`;
}

function updateAnimationsInDocument() {

  const el = document.querySelector(`#${ animationStylesId }`) ??
    createElementWithAttributes('style', { id: animationStylesId })!;

  el.innerHTML = [ ...keyframesCache.entries() ].map(
    ([ _key, { cssText } ]) => cssText
  ).join('\n\n');

  document.head.appendChild(el);
}
