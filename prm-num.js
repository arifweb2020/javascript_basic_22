const x = "arif";
// reverse
for(let i = x.length -1 ; i >=0 ; i--){
    console.log(x[i])
}


function isPrime(n) {

    if (n < 2){
         return `${n} is not a prime` 
    }
     
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return `${n} is not a prime number`
        }
    }
    return `${n} is a prime number`
}
console.log(isPrime(3));

// to print all prime number



const printPrimeNumbers = () => {
  for (let i = 2; i <= 100; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) console.log(i);
  }
};
printPrimeNumbers();


// to check odd and even

function odd(n){
    
   if(n % 2 === 0){
       console.log("even")
   }
   else{
       console.log("odd")
   }
  
    
}

console.log(odd(7))


// to print odd number

function evens(ag){
console.log("ag " , ag)

for (var mg=1; mg <=ag; mg++)
{
  if(mg%2==0){
    document.write(mg + "<br>")
  }
}
}
evens(12)

