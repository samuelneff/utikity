
export type Axis = 'x' | 'y';
export interface Size {
  width: number;
  height: number;
}

/**
 * Represents the new size of an input after it has been reduced with {@link fitPreservingAspectRatio}.
 */
export interface ReducedSize extends Size {
  originalChildSize: Size;
  containerSize: Size;
  multiplier: number;
  clippedAxis: Axis;
}

/**
 * Reduces the size of a child to fit within a container preserving the original aspect ratio,
 * returning the new size, the multiplier (amount of reduction), as well as which axis
 * was clipped to preserve aspect ratio—which axis will have empty space.
 *
 * @example
 * const container = {
 *   width: 400,
 *   height: 600,
 * };
 * const child = {
 *   width: 1000,
 *   height: 800,
 * };
 * const actual = fitPreservingAspectRatio(child, container);
 *
 * const expected = {
 *   width: 400,
 *   height: 240,
 *   multiplier: 0.4,
 *   clippedAxis: 'y',
 *   originalChildSize: {
 *     width: 1000,
 *     height: 800,
 *   },
 *   containerSize: {
 *     width: 400,
 *     height: 600,
 *   },
 * }
 *
 * expect(actual).toEqual(expected);
 */
export function fitPreservingAspectRatio(child: Size, container: Size): ReducedSize {

  const {
    width: childWidth,
    height: childHeight,
  } = child;

  const {
    width: containerWidth,
    height: containerHeight,
  } = container;

  const widthMultiplier = childWidth / containerWidth;
  const heightMultiplier = childHeight / containerHeight;
  const minMultiplier = Math.min(widthMultiplier, heightMultiplier);

  return {
    originalChildSize: child,
    containerSize: container,
    multiplier: minMultiplier,
    width: childWidth / minMultiplier,
    height: childHeight / minMultiplier,
    clippedAxis: minMultiplier === widthMultiplier ? 'y' : 'x',
  };
}
