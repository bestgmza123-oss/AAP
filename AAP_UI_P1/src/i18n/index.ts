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
