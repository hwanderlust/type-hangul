import wordJson from "./vocab.json";

export interface Word {
  id: string;
  word: string;
  definition: string;
}

const WORDS: Array<Word> = JSON.parse(JSON.stringify(wordJson));

export { WORDS };