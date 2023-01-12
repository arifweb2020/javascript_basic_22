let my_array = [0,1,5,7,0,8,12];
let two_largest = my_array.reduce(twoMax,[-Infinity,-Infinity]);
let second_largest = two_largest[1];
console.log(second_largest)


function getSecondLargest(nums) {
  let arr = [...new Set(nums)];

  //Javascript's array member method .sort( always sorts asciibetically.
  arr = arr.sort((a, b) => { return a - b });
  let result = arr[arr.length - 2] || arr[0];
  return result
}

const x = [ 56,58, 45, 3, 6, 23, 67, 54, 6, 9]

const p = x.sort((a, b) => { return a - b });

let result = x[x.length - 2] || x[0];


const x = [ 56, 45, 3, 6, 23, 67, 54, 6, 9]

const y = x.filter((val,i)=> x[i + 1] !==6 )

output = [56, 45, 3, 6, 67, 54, 6]
