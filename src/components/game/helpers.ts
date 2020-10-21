import { Game } from "../../helpers";
import wordJson from "./vocab.json";

export interface Word {
  id: string;
  word: string;
  definition: string;
}
interface WordManagerTest {
  getUsedWords: () => Array<number>;
}
export interface WordManager {
  select: () => Word;
  reset: () => void;
  Test: WordManagerTest;
}

const WORDS: Array<Word> = JSON.parse(JSON.stringify(wordJson));


function isNotAGame(param: string): boolean {
  const type = param.toLowerCase();
  return type.localeCompare("run") !== 0
    && type.localeCompare("pop") !== 0
    && type.localeCompare("jump") !== 0;
}

function gameTypeChanged(previous: Game, current: Game): boolean {
  return previous.localeCompare(current) !== 0;
}

function wordManager(): WordManager {
  // just the index really
  let usedWords: Array<number> = [];

  function select(): Word {
    const index = Math.floor(Math.random() * WORDS.length);
    const wasUsed = usedWords.find(i => i === index);

    if (wasUsed) {
      return select();
    }

    usedWords = [...usedWords, index];
    return WORDS[index];
  }

  function reset(): void {
    usedWords = [];
  }

  return {
    select,
    reset,
    Test: {
      getUsedWords: function () {
        return [...usedWords];
      }
    }
  }
}

export { WORDS, gameTypeChanged, isNotAGame, wordManager };