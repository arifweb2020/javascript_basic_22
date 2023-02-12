// ES6
let str = "This is a string sasahdbhdashff";
let largestWord = str.split(" ").reduce((acc, curr) => {
  return acc.length > curr.length ? acc : curr;
});
console.log(largestWord); // Output: 'string'

const x = "this is my number elephnat ok"

const z = Math.max(...x.split(" ").map((val)=> val.length))

console.log(z)
