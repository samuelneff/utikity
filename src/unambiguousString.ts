import { unambiguousLettersAndNumbers } from './constants';
import { createRandomStringGenerator, randomString } from './randomString';

export function unambiguousString(length: number): string;
export function unambiguousString(pattern: string): string;
export function unambiguousString(lengthOrPattern: any) {
  return randomString(lengthOrPattern, unambiguousLettersAndNumbers);
}

export function createUnambiguousStringGenerator(pattern: string) {
  return function unambiguousStringGenerator() {
    return createRandomStringGenerator(pattern, unambiguousLettersAndNumbers);
  }
}
