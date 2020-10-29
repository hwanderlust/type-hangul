export interface Score {
  increase: () => void;
  get: () => number;
  reset: () => void;
}

function Score() {
  let score = 0;

  return {
    increase: function () {
      score++;
    },
    get: function () {
      return score;
    },
    reset: function () {
      score = 0;
    },
  }
}

export default Score;