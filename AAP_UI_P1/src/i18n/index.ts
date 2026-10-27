import { en } from './en';

export type TranslationKey = keyof typeof en;
export type TranslationValues = Record<string, string | number>;

export function t(key: TranslationKey, values?: TranslationValues): string {
  const message = en[key];
  if (!values) return message;

  return message.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = values[name];
    return value === undefined ? placeholder : String(value);
  });
}

/** Expand a whole translated message for layout review; gameplay logic never reads this output. */
export function pseudoExpandMessage(message: string): string {
  const expanded = message
    .replace(/[aeiou]/gi, (vowel) => {
      const accents: Record<string, string> = { a: 'å', e: 'ë', i: 'ï', o: 'ø', u: 'ü' };
      return `${accents[vowel.toLowerCase()] ?? vowel}·${vowel}`;
    })
    .replace(/ /g, '   ');
  return `⟦ ${expanded} ··· ⟧`;
}

export function tExpanded(key: TranslationKey, values?: TranslationValues): string {
  return pseudoExpandMessage(t(key, values));
}
