import manageGameObjects, { BubblesX, Manager } from "../components/game/manager";

const vocab = { id: "123", word: "게으르다", definition: "lazy" };

describe("manager", () => {
  let manager: Manager;

  beforeEach(() => {
    manager = manageGameObjects();
  });

  describe("initializes properly", () => {
    it("list of available x values for the Display where bubbles can populate", () => {
      const { available, recent } = manager.Test.getBubbles();
      expect(recent.length).toBe(0);
      expect(available.length > 0).toBe(true);
    });
  });

  describe("renderBubble()", () => {
    let beforeRender: BubblesX;

    beforeEach(() => {
      beforeRender = manager.Test.getBubbles();
    });

    it("prevents dupes to the same location by moving x values back and forth from 'available' and 'recent' on each render", () => {
      manager.renderBubble(vocab);
      const firstRender = manager.Test.getBubbles();
      expect(firstRender.available.length).toBe(beforeRender.available.length - 1);
      expect(firstRender.recent.length).toBe(beforeRender.recent.length + 1);

      manager.renderBubble(vocab);
      const secondRender = manager.Test.getBubbles();
      expect(secondRender.available.length).toBe(firstRender.available.length - 1);
      expect(secondRender.recent.length).toBe(firstRender.recent.length + 1);

      manager.renderBubble(vocab);
      const thirdRender = manager.Test.getBubbles();
      expect(thirdRender.available.length).toBe(secondRender.available.length - 1);
      expect(thirdRender.recent.length).toBe(secondRender.recent.length + 1);

      manager.renderBubble(vocab);
      const fourthRender = manager.Test.getBubbles();
      expect(fourthRender.available.length).toBe(thirdRender.available.length);
      expect(fourthRender.recent.length).toBe(3);
    });
  });

  describe("popBubble()", () => {
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
      manager.popBubble(vocab);
      const bubble = document.getElementById(vocab.id);
      expect(bubble?.style.transform).toBe("scale(0)");
      expect(bubble?.style.transition).toBe("transform 150ms ease");
    });
  });

  describe("reset()", () => {
    it("pop -> clears 'recent' and moves all back to 'available'", () => {
      const beforeRender = manager.Test.getBubbles();
      manager.renderBubble(vocab);
      const afterRender = manager.Test.getBubbles();
      expect(afterRender.available.length).toBe(beforeRender.available.length - 1);
      expect(afterRender.recent.length).toBe(1);

      manager.reset("pop");
      const afterReset = manager.Test.getBubbles();
      expect(afterReset.available.length).toBe(beforeRender.available.length);
      expect(afterReset.recent.length).toBe(0);
    });

    it("resetting 'jump' doesn't effect 'pop' state", () => {
      const beforeRender = manager.Test.getBubbles();
      manager.renderBubble(vocab);
      const afterRender = manager.Test.getBubbles();
      manager.reset("jump");
      const afterReset = manager.Test.getBubbles();

      expect(afterRender.available.length).toBe(beforeRender.available.length - 1);
      expect(afterRender.recent.length).toBe(1);
      expect(afterReset.available.length).toBe(beforeRender.available.length - 1);
      expect(afterReset.recent.length).toBe(1);
    });
  });
});