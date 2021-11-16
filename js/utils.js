const CASES = [2, 0, 1, 1, 1, 2];
const DELAY = 500;

const Value = {
  TWO: 2,
  FOUR: 4,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  HUNDRED: 100,
};

const changeTitleByNumber = (number, titles) => titles[(number%Value.HUNDRED>Value.FOUR && number%Value.HUNDRED<Value.TWENTY)? Value.TWO : CASES[(number%Value.TEN<Value.FIVE)?number%Value.TEN:Value.FIVE]];

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {changeTitleByNumber, isEscapeKey, debounce};
