/**
 * All Latin-26 lowercase letters'.
 */
export const lowercaseLetters = 'abcdefghijklmnopqrstuvxyz';
/**
 * Subset of Latin-26 letters and numbers that could be confused with other letters or numbers.
 * | Character | Could be confused with |
 * | --------- | ---------------------- |
 * | `b` | `8` |
 * | `8` | `b` |
 * | `g` | `6` |
 * | `i` | `1` |
 * | `1` | `i` |
 * | `o` | `0` |
 * | `0` | `o` |
 * | `s` | `5` |
 * | `5` | `s` |
 * | `z` | `2` |
 * | `2` | `z` |
 *
 * @see {@link unambiguousLettersAndNumbers}
 */
export const ambiguousCharacters = 'b8g6i1lo0s5z2';

/**
 * All ten numbers zero through nine.
 */
export const numbers = '0123456789';

/**
 * All Latin-26 letters and ten numbers in lowercase.
 */
export const lowercaseLettersAndNumbers = lowercaseLetters + numbers;

/**
 * A subset of Latin-26 letters that are not likely to be confused with other letters or numbers.
 * See {@link ambiguousCharacters} for a table of ambiguous letters and numbers.
 *
 * @see {@link ambiguousCharacters}
 * @see {@link unambiguousLettersAndNumbers}
 * @see {@link unambiguousNumbers}
 */
export const unambiguousLetters = 'acdefhjkmnpqrtuvxy';

/**
 * A subset of numbers that are not likely to be confused with other letters or numbers.
 * See {@link ambiguousCharacters} for a table of ambiguous letters and numbers.
 *
 * @see {@link ambiguousCharacters}
 * @see {@link unambiguousLetters}
 * @see {@link unambiguousLettersAndNumbers}
 */
export const unambiguousNumbers = '3479';

/**
 * A subset of Latin-26 letters and numbers that are not likely to be confused with other letters or numbers.
 * See {@link ambiguousCharacters} for a table of ambiguous letters and numbers.
 *
 * @see {@link ambiguousCharacters}
 * @see {@link unambiguousLetters}
 * @see {@link unambiguousNumbers}
 */
export const unambiguousLettersAndNumbers = unambiguousLetters + unambiguousNumbers;

/**
 * Regular expression of all Latin characters including accented characters, which are
 * excluded by the `\w` character group.
 */
export const allLatinLettersRegex = /[A-Za-zÀ-ÿ]+/g;

/**
 * Regular expression excluding all Latin characters including accented characters, which are
 * excluded by the `\w` character group.
 */
export const nonLatinLettersRegex = /[^A-Za-zÀ-ÿ]+/g;

/**
 * Regular expression of characters valid in filenames across operating systems.
 */
export const allValidFileNameCharacters = /[!"#%&'()+,./0-9=@A-Z\[\]_a-z\{\}~-]+/g;

/**
 * Regular expression for an date string with optional time, millisecond, and UTC components.
 * The pattern matches an intentional subset of ISO–8601 such as `2024-07-19T21:05:58.123Z`
 * where the time portion may be excluded, or the milliseconds portion may be excluded, or the
 * UTC indicator may be excluded. No other timezones or timezone modifiers are a valid match.
 */
export const dateTimeRegex = /^\d{4}-\d\d-\d\d(?:T\d\d:\d\d:\d\d(?:\.\d{1,3})?Z)?$/;

/**
 * Very liberal regular expression to match valid email addresses. It will match all valid
 * email addresses but in some very rare edge cases may allow an invalid one. In our experience
 * more complicated email regular expressions that attempt to pattern the [rfc!5321],
 * [rfc!5322], or [rfc!6531]
 */
export const emailRegex = /^[^ '"\<\>@]+@[^ '"\<\>@]+\.[^ '"\<\>@.]+$/;

/**
 * Milliseconds in a second. 😀 Obvious but expressive, especially when combined with other units.
 */
export const millisecondsPerSecond = 1000;

/**
 * Seconds in a minute. 😀 Obvious but expressive, especially when combined with other units.
 */
export const secondsPerMinute = 60;

/**
 * Minutes in an hour. 😀 Obvious but expressive, especially when combined with other units.
 */
export const minutesPerHours = 60;

/**
 * Hours in a day. 😀 Obvious but expressive, especially when combined with other units.
 */
export const hoursPerDay = 24;

/**
 * Milliseconds in a minute.
 */
export const millisecondsPerMinute = millisecondsPerSecond * secondsPerMinute;

/**
 * Milliseconds in an hour.
 */
export const millisecondsPerHour = millisecondsPerMinute * minutesPerHours;

/**
 * Milliseconds in a day.
 */
export const millisecondsPerDay = millisecondsPerHour * hoursPerDay;

/**
 * Seconds in an hour.
 */
export const secondsPerHour = secondsPerMinute * minutesPerHours;

/**
 * Seconds in a day.
 */
export const secondsPerDay = secondsPerHour * hoursPerDay;

/**
 * Minutes in a day.
 */
export const minutesPerDay = minutesPerHours * hoursPerDay;

/**
 * Object with no keys. More expressive then `{}` and will produce object equality if reused.
 */
export const emptyObject = {};

/**
 * Empty array, more expressive than `[]` and will produce object equality if reused.
 */
export const emptyArray = [] as any[];
