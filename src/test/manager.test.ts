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

    it("list of available x and y values for the Display where platforms can populate", () => {
      const { current, xSelection, ySelection, yIndex } = manager.Test.getPlatforms();
      expect(current.length).toBe(0);
      expect(yIndex).toBe(0);
      expect(xSelection.length).not.toBe(0);
      expect(ySelection.length > 0).toBe(true);
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

  describe("renderPlatform()", () => {
    it("keeps track of all platforms", () => {
      const beforeRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const firstRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const secondRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const thirdRender = manager.Test.getPlatforms();

      expect(beforeRender.current.length).toBe(0);
      expect(firstRender.current.length).toBe(1);
      expect(secondRender.current.length).toBe(2);
      expect(thirdRender.current.length).toBe(3);
    });

    it("manages y value/coordinate by looping through y-collection via index", () => {
      const beforeRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const firstRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const secondRender = manager.Test.getPlatforms();

      expect(beforeRender.yIndex).toBe(0);
      expect(firstRender.yIndex).toBe(1);
      expect(secondRender.yIndex).toBe(0); // shuffles back, only 2 in 'ySelection'
    });
  });

  describe.skip("jumpToPlatform()", () => {
    // likely to change and possibly by a lot
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

    it("jump -> clears 'current' and sets 'yIndex' back to 0", () => {
      const beforeRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const afterRender = manager.Test.getPlatforms();
      manager.reset("jump");
      const afterReset = manager.Test.getPlatforms();

      expect(beforeRender.current.length).toBe(0);
      expect(beforeRender.yIndex).toBe(0);
      expect(afterRender.current.length).toBe(1);
      expect(afterRender.yIndex).toBe(1);
      expect(afterReset.current.length).toBe(0);
      expect(afterReset.yIndex).toBe(0);
    });

    it("resetting 'pop' doesn't effect 'jump' state", () => {
      const beforeRender = manager.Test.getPlatforms();
      manager.renderPlatform(vocab);
      const afterRender = manager.Test.getPlatforms();
      manager.reset("pop");
      const afterReset = manager.Test.getPlatforms();

      expect(beforeRender.current.length).toBe(0);
      expect(beforeRender.yIndex).toBe(0);
      expect(afterRender.current.length).toBe(1);
      expect(afterRender.yIndex).toBe(1);
      expect(afterReset.current.length).toBe(1);
      expect(afterReset.yIndex).toBe(1);
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