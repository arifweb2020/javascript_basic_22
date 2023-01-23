const x =["a" , "g" , "h" , "e" , "g" , "w" , "a" , "g" , "g", "g"];

let count = 0
 for (let i=0 ; i< x.length ; i++){
     
     if(x[i] === "a"){
         
         for(let j=i ; j< x.length ; j++){
             
              if(x[j] === "g"){
                   count += 1
              }
         }
     }
 }
 
 console.log(count)

const y = ["a","g"]
const counts = x.filter((val)=> y.includes(val));

console.log(counts)
