import { upperFirst, camelCase } from 'lodash';

export function pascalCase(value: string) {
  return upperFirst(camelCase(value));
}
