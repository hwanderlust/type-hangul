import 'jest-styled-components';
import renderer from 'react-test-renderer';

import Score from "../components/game/Score";

describe("<Score/>", () => {
  it('renders correctly', () => {
    const score = Score();
    const tree = renderer
      .create(score.render())
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("increase()", () => {
    const score = Score();

    it("adds 1 to the current score", () => {
      expect(score.get()).toBe(0);
      score.increase();
      expect(score.get()).toBe(1);
      score.increase();
      expect(score.get()).toBe(2);
      score.increase();
      expect(score.get()).toBe(3);
    });
  });

  describe("get()", () => {
    const score = Score();

    it("returns the current score", () => {
      expect(score.get()).toBe(0);
      score.increase();
      expect(score.get()).toBe(1);
    });
  });

  describe("reset()", () => {
    const score = Score();

    it("clears the current score back to 0", () => {
      expect(score.get()).toBe(0);
      score.increase();
      score.increase();
      score.increase();
      expect(score.get()).toBe(3);
      score.reset();
      expect(score.get()).toBe(0);
    });
  });
});
