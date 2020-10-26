import Bubbles, { BubblesState, BubblesManager } from "../components/game/Bubbles";

const vocab = { id: "123", word: "게으르다", definition: "lazy" };

describe("manager", () => {
  let manager: BubblesManager;

  beforeEach(() => {
    manager = Bubbles();
  });

  describe("initializes properly", () => {
    it("list of available x values for the Display where bubbles can populate", () => {
      const { available, recent } = manager.Test.getState();
      expect(recent.length).toBe(0);
      expect(available.length > 0).toBe(true);
    });
  });

  describe("renderBubble()", () => {
    let beforeRender: BubblesState;

    beforeEach(() => {
      beforeRender = manager.Test.getState();
    });

    it("prevents dupes to the same location by moving x values back and forth from 'available' and 'recent' on each render", () => {
      manager.render(vocab);
      const firstRender = manager.Test.getState();
      expect(firstRender.available.length).toBe(beforeRender.available.length - 1);
      expect(firstRender.recent.length).toBe(beforeRender.recent.length + 1);

      manager.render(vocab);
      const secondRender = manager.Test.getState();
      expect(secondRender.available.length).toBe(firstRender.available.length - 1);
      expect(secondRender.recent.length).toBe(firstRender.recent.length + 1);

      manager.render(vocab);
      const thirdRender = manager.Test.getState();
      expect(thirdRender.available.length).toBe(secondRender.available.length - 1);
      expect(thirdRender.recent.length).toBe(secondRender.recent.length + 1);

      manager.render(vocab);
      const fourthRender = manager.Test.getState();
      expect(fourthRender.available.length).toBe(thirdRender.available.length);
      expect(fourthRender.recent.length).toBe(3);
    });
  });

  describe("pop()", () => {
    beforeAll(() => {
      document.body.innerHTML = `
        <div>
          <div id=${vocab.id}></div>
        </div>
      `;
    });

    afterAll(() => {
      document.body.innerHTML = "";
    });

    it("adds in-line styling for a vanishing effect", () => {
      manager.pop(vocab);
      const bubble = document.getElementById(vocab.id);
      expect(bubble?.style.transform).toBe("scale(0)");
      expect(bubble?.style.transition).toBe("transform 150ms ease");
    });
  });

  describe("reset()", () => {
    it("clears 'recent' and moves all back to 'available'", () => {
      const beforeRender = manager.Test.getState();
      manager.render(vocab);
      const afterRender = manager.Test.getState();
      expect(afterRender.available.length).toBe(beforeRender.available.length - 1);
      expect(afterRender.recent.length).toBe(1);

      manager.reset();
      const afterReset = manager.Test.getState();
      expect(afterReset.available.length).toBe(beforeRender.available.length);
      expect(afterReset.recent.length).toBe(0);
    });
  });
});