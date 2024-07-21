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
 * An extended set of all characters used in all Latin languages plus other characters that
 * are commonly encountered in people's names in European languages that use variations
 * similar to the Latin alphabet but are not traditionally considered Latin. The table below shows all
 * languages and letters from each that are included.
 *
 * | Language    | Additional Characters |
|-------------|------------------------------------------------------------------------------------------------------------------|
| Catalan     | À, Á, Â, Ç, È, É, Ê, Í, Ò, Ó, Ô, Ú, Ü, Ý, À, È, Ò, Ç |
| Czech        | Ă, ă, Č, č, Ď, ď, Ě, ě, Ň, ň, Ř, ř, Š, š, Ť, ť, Ž, ž |
| Croatian     | Č, č, Đ, đ, Š, š, Ž, ž |
| Dutch        | Ĳ, ĳ |
| English      | A-Z, a-z (standard Latin letters) |
| Estonian     | Ä, Ö, Ü, Š, Z |
| Finnish      | Å, Ä, Ö |
| French       | À, Â, Æ, Ç, É, È, Ê, Ë, Î, Ï, Ô, Œ, Ù, Û, Ü, Ý |
| German       | Ä, Ö, Ü, ß |
| Hungarian    | Á, Ă, ă, É, Ę, ę, Í, Ō, ō, Ū, ū, Ű, ű |
| Icelandic    | Á, Ð, ß, Í, Ó, Ú, Ý, Þ, æ, ö |
| Latvian      | Ā, ā, Č, č, Ē, ē, Ģ, ģ, Ķ, ķ, Ļ, ļ, Ņ, ņ, Š, š, Ū, ū, Ž, ž |
| Lithuanian   | Ā, ā, Č, č, Ę, ę, Ė, ė, Ģ, ģ, Ķ, ķ, Ļ, ļ, Ņ, ņ, Š, š, Ū, ū, Ž, ž |
| Maltese      | Ċ, ċ, Ġ, ġ, Ħ, ħ |
| Polish       | Ą, ą, Ć, ć, Ę, ę, Ł, ł, Ń, ń, Ó, ó, Ś, ś, Ź, ź, Ż, ż |
| Portuguese   | À, Á, Â, Ã, Ç, Ê, Í, Ó, Ô, Õ, Ú, Ü, Ý, à, á, â, ã, ç, ê, í, ò, ô, õ, ú, ü, ý |
| Romanian     | Ă, ă, Â, â, Î, î, Ş, ş, Ţ, ţ |
| Serbian      | Č, č, Đ, đ, Š, š, Ž, ž |
| Slovak       | Ď, ď, Ň, ň, Ŕ, ŕ, Š, š, Ť, ť, Ž, ž |
| Slovenian    | Č, č, Š, š, Ž, ž |
| Spanish      | Á, É, Í, Ñ, Ó, Ú, Ü, á, é, í, ñ, ó, ú, ü |
| Swedish      | Å, Ä, Ö |
| Turkish      | Ğ, ğ, İ, ı, Ş, ş, Ç, ç |
| Welsh        | Ĥ, ĥ, Ŵ, ŵ, Ŷ, ŷ |
 */
export const allLatinLetters = `
AÀÁÂÃÄÅĀĂĄǍǺÆĀĂĄƁḂĆĈČÇḈĊȻÐĎĐÉÈÊËĒĔĘĚƏƒĜĞĠĢƓĤḢĦÌÍÎÏĨĪĬĮİǏĴĶḰĹĻĽĿŁḾŃŅŇÑŊÒÓÔÕÖØŌŎŐǑŒƆÞǶŔŖŘŚŜŞŠẞṤŦŤŢÙÚÛÜŨŪŬŮŰŲǓŴẀẂẄỲÝŶŸŹŻŽƵ
B
CÇĆĈĊČ
DĎĐÐ
EÈÉÊËĒĔĖĘĚƏ
Fƒ
GĜĞĠĢƓ
HĤḢĦ
IÌÍÎÏĨĪĬĮİǏ
JĴ
KĶḰ
LĹĻĽĿŁ
MḾ
NŃŅŇÑŊ
OÒÓÔÕÖØŌŎŐǑŒƆ
P
Q
RŔŖŘ
SŚŜŞŠẞṤ
TŢŤŦ
UÙÚÛÜŨŪŬŮŰŲǓ
V
WŴẀẂẄ
X
YÝŶŸỲ
ZŹŻŽƵ

aàáâãäåāăąǎǻæāăąɓḃćĉčçḉċȼðďđéèêëēĕėęěəƒĝğġģɠĥḣħìíîïĩīĭįıǐĵķḱĺļľŀłḿńņňñŋòóôõöøōŏőǒœɔþǷŕŗřśŝşšßṥŧťţùúûüũūŭůűųǔŵẁẃẅỳýŷÿźżžƶ
b
cçćĉċč
dďđð
eèéêëēĕėęěə
fƒ
gĝğġģɠ
hĥḣħ
iìíîïĩīĭįıǐ
jĵ
kķḱ
lĺļľŀł
mḿ
nńņňñŋ
oòóôõöøōŏőǒœɔ
p
q
rŕŗř
sśŝşšßṥ
tţťŧ
uùúûüũūŭůűųǔ
v
wŵẁẃẅ
x
yýŷÿỳ
zźżžƶ
Þþ
Đđ
Łł
Śś
Źź
Żż
Čč
Ďď
Ňň
Řř
Šš
Ťť
Žž
Őő
Űű
Ćć
Ęę
Łł
Ńń
Śś
Źź
Żż
Ĳĳ
Ĉĉ
Ġġ
Ħħ
Ŋŋ
Ħħ
Ċċ
Ġġ
ċ
Ġġ
Ħħ
Ċċ
Ġġ
Ħħ
Ċċ
Ġġ
Ħħ
`.replace(/\s/g, '');

/**
 * Regular expression of all Latin characters including accented characters, which are
 * excluded by the `\w` character group. See {@link allLatinLetters} for a more complete
 * explanation.
 */
export const allLatinLettersRegex = new RegExp(`[${ allLatinLetters }]+`);

/**
 * Regular expression excluding all Latin characters including accented characters, which are
 * excluded by the `\w` character group.
 */
export const nonLatinLettersRegex = new RegExp(`[^${ allLatinLetters }]+`);

/**
 * Regular expression of characters valid in filenames across operating systems.
 */
export const allValidFileNameCharacters = new RegExp(`[!"#%&'()+,./0-9=@\\[\\]_\\{\\}~${ allLatinLetters }-]+`);

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
