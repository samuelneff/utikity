import { jsonParseBetter, jsonStringifyBetter, yamlParse } from '../src';

const aliasYaml = `
q:
  - a1: &aliased
      - item1
      - item2
  - a2: *aliased
`;

const questionnaireYaml = `
- areaRef: family
  sections:
  - sectionRef: marriageInfo
    questions:
    - questionRef: userMaritalTitle
      questionType: chooseOne
      answerOptions: &maritalTitleOptions
        - husband
        - wife
        - spouse1
        - spouse2

    - questionRef: dateOfMarriage
      questionType: date
      isRequired: true

  - sectionRef: spouseInfo
    questions:
    - questionRef: spouseMaritalTitle
      questionType: chooseOne
      answerOptions: *maritalTitleOptions
      exclusiveOfQuestionRef: userMaritalTitle

  - sectionRef: haveChildrenInfo
    questions:
    - questionRef: childrenWithSpouse
      questionType: boolean
      isRequired: true

    - questionRef: userHasSeparateChildren
      questionType: boolean
      isRequired: true

    - questionRef: spouseHasSeparateChildren
      questionType: boolean
      isRequired: true
`;

test('aliases not copied', () => {
  const parsed: any = yamlParse(
    aliasYaml,
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
  const parsed: any = yamlParse(aliasYaml);
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

test('questionnaire aliases copied', () => {
  const parsed: any = yamlParse(questionnaireYaml);
  expect(Array.isArray(parsed)).toBeTruthy();
  const aliasSource = parsed[ 0 ]?.sections?.[ 0 ]?.questions?.[ 0 ]?.answerOptions;
  const aliasTarget = parsed[ 0 ]?.sections?.[ 1 ]?.questions?.[ 0 ]?.answerOptions;
  expect(aliasSource).toBeDefined();
  expect(aliasTarget).toBeDefined();
  expect(aliasSource).toEqual([ 'husband', 'wife', 'spouse1', 'spouse2' ]);
  expect(aliasTarget).toEqual([ 'husband', 'wife', 'spouse1', 'spouse2' ]);
  expect(aliasSource).not.toBe(aliasTarget);
});

test('yaml parse, json stringify, json parse round trip', () => {
  const parsed: any = yamlParse(questionnaireYaml);
  const stringified = jsonStringifyBetter(parsed);

  const titleArray = JSON.stringify([ 'husband', 'wife', 'spouse1', 'spouse2' ]);
  const firstIndex = stringified.indexOf(titleArray);
  expect(firstIndex).toBeGreaterThan(0);
  const secondInstance = stringified.indexOf(titleArray, firstIndex + 1);
  expect(secondInstance).toBeGreaterThan(firstIndex);

  const reparsed: any = jsonParseBetter(stringified);
  const aliasSource = reparsed[ 0 ]?.sections?.[ 0 ]?.questions?.[ 0 ]?.answerOptions;
  const aliasTarget = reparsed[ 0 ]?.sections?.[ 1 ]?.questions?.[ 0 ]?.answerOptions;
  expect(aliasSource).toBeDefined();
  expect(aliasTarget).toBeDefined();
  expect(aliasSource).toEqual([ 'husband', 'wife', 'spouse1', 'spouse2' ]);
  expect(aliasTarget).toEqual([ 'husband', 'wife', 'spouse1', 'spouse2' ]);
});

