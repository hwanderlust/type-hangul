import { WordManager, gameTypeChanged, isNotAGame, wordManager } from "../components/game/helpers";

describe("Game", () => {

  describe("helpers", () => {
    enum Game {
      pop = "pop",
      jump = "jump",
    }

    describe("gameTypeChanged()", () => {
      it("returns TRUE when the game changed from 'pop' to 'jump'", () => {
        expect(gameTypeChanged(Game.pop, Game.jump)).toBe(true);
      });
      it("returns TRUE when the game changed from 'jump' to 'pop'", () => {
        expect(gameTypeChanged(Game.jump, Game.pop)).toBe(true);
      });
    });

    describe("isNotAGame()", () => {
      it("returns TRUE if anything other than 'run', 'pop', or 'jump'", () => {
        expect(isNotAGame("poop")).toBe(true);
        expect(isNotAGame("duh")).toBe(true);
        expect(isNotAGame("bahhaha")).toBe(true);
        expect(isNotAGame("123")).toBe(true);
        expect(isNotAGame("...")).toBe(true);
        expect(isNotAGame("   ")).toBe(true);
        expect(isNotAGame("")).toBe(true);
      });
      it("returns FALSE if either 'run', 'pop', or 'jump'", () => {
        expect(isNotAGame(Game.pop)).toBe(false);
        expect(isNotAGame(Game.jump)).toBe(false);
      });
    });

    describe("wordManager()", () => {
      let manager: WordManager;

      beforeAll(() => {
        manager = wordManager();
      })

      it("calling select() will choose a random word and keep track of it", () => {
        const before = manager.Test.getUsedWords();
        manager.select();
        const after = manager.Test.getUsedWords();
        expect(before.length).toBe(0);
        expect(after.length).toBe(1);
      });

      it("calling reset() clears the record of all used words", () => {
        const before = manager.Test.getUsedWords();
        manager.reset();
        const after = manager.Test.getUsedWords();
        expect(before.length).toBe(1);
        expect(after.length).toBe(0);
      })
    });
  });
});