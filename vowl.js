const x = "arif hussain"
const y = x.split("")
const vowels = ["a","i","o","u"]
const V = y.filter(char => vowels.includes(char));

console.log(V)




//

const x = "arif hussain"
const y = x.split("")
console.log(y)



const vowels= (text)=> {

const test = ["a","i","o","u"]

return test.includes(text)


}

vowels(y)
