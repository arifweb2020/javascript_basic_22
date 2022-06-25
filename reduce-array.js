const numbers = [2, 4, 6];
const sum = numbers.reduce(function(sum, number) {
  const updatedSum = sum + number;
  return updatedSum;
}, 0);
sum; // 12



const numbers = [175, 50, 25];

document.getElementById("demo").innerHTML = numbers.reduce(myFunc);

function myFunc(total, num) {
  return total - num;
}
