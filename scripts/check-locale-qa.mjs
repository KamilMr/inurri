#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const repoRoot = resolve(new URL('..', import.meta.url).pathname);
const localeFiles = {
  en: resolve(repoRoot, 'src/i18n/locales/en.properties'),
  pl: resolve(repoRoot, 'src/i18n/locales/pl.properties'),
};

function parseProperties(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const entries = new Map();
  const duplicates = [];

  content.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);

    if (entries.has(key)) {
      duplicates.push({ key, line: index + 1 });
    }

    entries.set(key, { value, line: index + 1 });
  });

  return { entries, duplicates };
}

function placeholders(value) {
  return [...value.matchAll(/\{[^{}]+\}/g)].map((match) => match[0]).sort();
}

function sameList(left, right) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

const parsed = Object.fromEntries(
  Object.entries(localeFiles).map(([locale, filePath]) => [locale, parseProperties(filePath)]),
);

const enKeys = [...parsed.en.entries.keys()].sort();
const plKeys = [...parsed.pl.entries.keys()].sort();
const missingInPl = enKeys.filter((key) => !parsed.pl.entries.has(key));
const missingInEn = plKeys.filter((key) => !parsed.en.entries.has(key));
const sharedKeys = enKeys.filter((key) => parsed.pl.entries.has(key));
const placeholderMismatches = sharedKeys.filter((key) => {
  const enPlaceholders = placeholders(parsed.en.entries.get(key).value);
  const plPlaceholders = placeholders(parsed.pl.entries.get(key).value);

  return !sameList(enPlaceholders, plPlaceholders);
});
const emptyValues = Object.entries(parsed).flatMap(([locale, { entries }]) =>
  [...entries.entries()]
    .filter(([, entry]) => entry.value.length === 0)
    .map(([key, entry]) => ({ locale, key, line: entry.line })),
);

let hasErrors = false;

for (const [locale, { duplicates }] of Object.entries(parsed)) {
  if (duplicates.length === 0) {
    continue;
  }

  hasErrors = true;
  console.error(`Duplicate keys in ${relative(repoRoot, localeFiles[locale])}:`);
  duplicates.forEach(({ key, line }) => console.error(`  - ${key} on line ${line}`));
}

if (missingInPl.length > 0) {
  hasErrors = true;
  console.error('Keys missing in pl.properties:');
  missingInPl.forEach((key) => console.error(`  - ${key}`));
}

if (missingInEn.length > 0) {
  hasErrors = true;
  console.error('Keys missing in en.properties:');
  missingInEn.forEach((key) => console.error(`  - ${key}`));
}

if (placeholderMismatches.length > 0) {
  hasErrors = true;
  console.error('Placeholder mismatches:');
  placeholderMismatches.forEach((key) => {
    const enPlaceholders = placeholders(parsed.en.entries.get(key).value).join(', ') || '(none)';
    const plPlaceholders = placeholders(parsed.pl.entries.get(key).value).join(', ') || '(none)';
    console.error(`  - ${key}: en [${enPlaceholders}], pl [${plPlaceholders}]`);
  });
}

if (emptyValues.length > 0) {
  console.warn('Empty locale values to review:');
  emptyValues.forEach(({ locale, key, line }) => {
    console.warn(`  - ${locale}.properties:${line} ${key}`);
  });
}

if (hasErrors) {
  process.exitCode = 1;
} else {
  console.log(`Locale QA passed: ${sharedKeys.length} shared keys checked.`);
}
