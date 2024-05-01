const initialVariable = [1, 5, 4, 3, 2, 8, 7, 6, 9, -5, -4];

let newArray = [];
let previousTerm = 50;
for (let min of initialVariable) {
  if (min < previousTerm) {
    previousTerm = min;
  }
}
let orderObject = {};
console.log(previousTerm);

for (let i = 0; i < initialVariable.length; i++) {
  const currentTerm = initialVariable[i];
  let count = 0;
  for (const j of initialVariable) {
    if (currentTerm > j) {
      count++;
    }
  }
  console.log(`Contador: ${count}`);
  if (currentTerm > previousTerm) {
    console.log(`${currentTerm} é MAIOR que ${previousTerm}`);
  } else {
    console.log(`${currentTerm} é MENOR que ${previousTerm}`);
  }
  orderObject[currentTerm] = count;
  previousTerm = currentTerm;
}
console.log(orderObject);
