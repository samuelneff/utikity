import { yamlParse } from '../src';

const alilasYaml = `
q:
  - a1: &aliased
      - item1
      - item2
  - a2: *aliased
`;

test('aliases not copied', () => {
  const parsed: any = yamlParse(
    alilasYaml,
    {
      copyAliases: false
    }
  );
  expect(parsed).toEqual(
    {
      q: [
        { a1: [ 'item1', 'item2' ] },
        { a2: [ 'item1', 'item2' ] }
      ]
    }
  );
  expect(parsed.q[0].a1).toBe(parsed.q[1].a2);
});

test('aliases copied', () => {
  const parsed: any = yamlParse(alilasYaml);
  expect(parsed).toEqual(
    {
      q: [
        { a1: [ 'item1', 'item2' ] },
        { a2: [ 'item1', 'item2' ] }
      ]
    }
  );
  expect(parsed.q[ 0 ].a1).not.toBe(parsed.q[ 1 ].a2);
});