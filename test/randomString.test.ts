import { defaultRandomChars, randomString } from '../src/randomString';

test('5, undefined', () => {
  const validPattern = new RegExp("^" + `[${ defaultRandomChars }]`.repeat(5) + "$");

  // not great but we're testing randomness so best we can do without mocking is running lots of iterations
  for (let i = 0; i < 10000; i++) {
    const actual = randomString(5);
    expect(actual).toMatch(validPattern);
  }
});
