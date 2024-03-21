/*[start, end] denotes a range of integers between start(inclusive) and
  end(inclusive)*/

//Returns a random integer from the range [start, end]
function randomInt(start, end) {
  return start + Math.floor(Math.random() * (end - start + 1));
}

//Returns random selection of n unique integers from the range [start, end]
//contained in a Set
function randomSelection(start, end, n) {
  const chosen = new Set();
  while (chosen.size < n) {
    chosen.add(randomInt(start, end));
  }
  return chosen;
}

export { randomInt, randomSelection };
