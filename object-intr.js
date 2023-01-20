
//1>
const property = "firstName";
const name = "Ryan";

const user = {

 [property] : name
   
}

console.log(user)
// output - firstName: "Ryan"

//2> 

const user1 = {

 name:"Ryan",
 age : 20
   
}

console.log(Object.keys(user1))
console.log(Object.values(user1))

//3>

const objj = {
 a : "one",
 b : "two",
 a : "three"
 
}

console.log(objj)

// output {a: 'three', b: 'two'} first a value is replace by last 

// 4 > multipy on number in object with 2

   const nnn = {
    a : 10,
 b : 20,
 title : "Test"
   
   }


multiplyNum(nnn)

function multiplyNum(obj){

   for(let key in obj){
    console.log(key)
	//op a,b,title
	console.log(obj[key])
	//op 10,20,Test
	
	 if(typeof obj[key] === "number"){
	      obj[key] = obj[key] * 2
	 }
   
   }


}

console.log(nnn)

// output - {a: 20, b: 40, title: 'Test'}

// 5> object is not converted into key


const a= {}

const b = { key: "b"}
const c = { key: "c"}

a[b]= 345;
a[c]= 343

console.log(a)
// output  - [object Object] = 343

console.log(a[b])
// output = 343 it takes lastest value only


// 6> wat is output

console.log([..."arif"])

// output ['a', 'r', 'i', 'f']

// 7> stringify only selected item

const test = {
  name :"lee",
  age:23,
  college: "Tjit"

}

const dd = JSON.stringify(test , ["age","college"])

console.log(dd)

// output - {"age":23,"college":"Tjit"}

// 8 > Destruc

let mn = {
   sports: "test",
   age : 23,
   fullName:{
     
	 clg : "RV",
	 estd : 2220
   
   }

}

const sports = "pass"

// it will create error so we hav to use key name
const {sports : mysports , fullName: {clg}} = mn

console.log(mysports , clg)

// when we assign one object to another we r not copying all of the properties variables to another wr are providing refrernce

// js object both hv different space in memory so we cant compare
