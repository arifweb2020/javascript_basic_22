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
