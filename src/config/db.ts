import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getPossibleWords(word: string): string[] {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const accentVowels = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'à', 'è', 'ì', 'ò', 'ù'];
  let possibleWords = [word];

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const index = vowels.indexOf(letter);

    if (index !== -1) {
      const newWords = [];
      for (let j = 0; j < possibleWords.length; j++) {
        const possibleWord = possibleWords[j];
        newWords.push(
          possibleWord.substring(0, i) + accentVowels[index] + possibleWord.substring(i + 1)
        );
      }
      possibleWords = possibleWords.concat(newWords);
    }
  }

  return possibleWords;
}

prisma.$use(async (params, next) => {
  if (params.action === 'findMany' && params.args) {
    const stringArgs = JSON.stringify(params.args);
    const regex = /"contains":/;
    const matches = stringArgs?.match(regex);

    if (matches?.length) {
      let results: string[] = [];

      const firstIndex = stringArgs.indexOf(matches[0]) + matches[0].length + 1;
      const value = stringArgs.slice(firstIndex, stringArgs.indexOf('"', firstIndex));

      const valueWithoutAccents = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const possibleWords = getPossibleWords(valueWithoutAccents);

      for (const possibleWord of possibleWords) {
        const newStringArgs = stringArgs.replaceAll(
          `"contains":"${value}"`,
          `"contains":"${possibleWord}"`
        );
        const newArgs = JSON.parse(newStringArgs);

        const result = await next({ ...params, args: newArgs });

        results = [...results, ...result];
      }

      return results;
    }
  }

  if (params.action === 'count' && params.args) {
    const stringArgs = JSON.stringify(params.args);
    const regex = /"contains":/;
    const matches = stringArgs?.match(regex);

    if (matches?.length) {
      let results: number = 0;

      const firstIndex = stringArgs.indexOf(matches[0]) + matches[0].length + 1;
      const value = stringArgs.slice(firstIndex, stringArgs.indexOf('"', firstIndex));

      const valueWithoutAccents = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const possibleWords = getPossibleWords(valueWithoutAccents);

      for (const possibleWord of possibleWords) {
        const newStringArgs = stringArgs.replaceAll(
          `"contains":"${value}"`,
          `"contains":"${possibleWord}"`
        );
        const newArgs = JSON.parse(newStringArgs);

        const result = await next({ ...params, args: newArgs });

        results += result;
      }

      return results;
    }
  }

  const result = await next(params);

  return result;
});

export default prisma;
