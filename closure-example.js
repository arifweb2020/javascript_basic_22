Async code
Closures are commonly used with async code, for example: sending a POST request using the Fetch API:
function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(`${data} from ${url}`));
}

getData("https://example.com/answer");


When getData is called, it finishes executing before the fetch request is complete. The inner function fetch closes over the url function parameter variable. This preserves the url variable.


function sum(a){

   let c = 10;
   
   return function total(b){
      return a + c +b
   }
  

}

// we hv to store sum(2) which is outer function in some variable
let x = sum(2)

console.log(x(4))


function sum(a){

   let c = 10;
   
   return function total(b){
      let d = 12;
	  
	  function finalTotal (e){
	  // for test we can assign one more varoiable eith name d coz let block scope
	  let d = 20;
	    return a + c + b  + d + e + d
	  }
	  
	  return finalTotal;
   }
  

}

// we hv to store sum(2) which is outer function in some variable
let x = sum(2)
// we hv to store x(5) which is child outer function in some variable
let y = x(5)

console.log(y(4))



let sum = function (a,b,c){

   return {
   
      getTwo: function (){
	     return a+b;
	  },
	  
	  getThree: function (){
	     return a+b+c;
	  },
	 
   }

}

 let x = sum(1,2,3);
 console.log(x.getTwo())
  console.log(x.getThree())


function counter(step) {
  let count = 0;
  return function increaseCount() {
    count += step;
    return count;
  };
}

let add3 = counter(3); // returns increaseCount function. Sets step and count to 3
let add5 = counter(5); // returns increaseCount function. Sets step and count to 5

add3(); // 3
add3(); // 3
console.log(add3()); // 6

add5(); // 5
add5(); // 10
console.log(add5()); // 15



function outerOuterFunction() {
  let outerOuterFuncVar = "outside outside";
  return function outerFunction() {
    let outerFuncVar = "outside";
    function innerFunction() {
      console.log(`The outerFunction value is: ${outerFuncVar}`);
      console.log(`The outerOuterFunction value is: ${outerOuterFuncVar}`);
    }
    return innerFunction;
  };
}

const outerFunct = outerOuterFunction();
const innerFunct = outerFunct();
innerFunct();


Currying a function is when a function that takes multiple arguments is written in such a way that it can only take one argument at a time.
function curryFunction(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}
console.log(curryFunction(1)(2)(3)); // 6
