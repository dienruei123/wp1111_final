var number;

function getNumber() {
  return number;
}
function genNumber() {
  number = Math.floor(Math.random() * 100) + 1;
}

export { getNumber, genNumber };
