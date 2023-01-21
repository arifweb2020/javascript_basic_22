const yourArray = ['Jimbo', '555-555-5555', 'jimbo@aol.com'];

const [name, phone, email] = yourArray;
const yourObject = { name, phone, email };

console.log(yourObject);


const peopleArrays = [
  ['Jimbo', '555-555-5555', 'jimbo@aol.com'],
  ['Lakshmi', '123-456-7890', 'lakshmi@compuserve.com']
];

const peopleObjects = peopleArrays
  .map(([name, phone, email]) => ({ name, phone, email }));

console.log(peopleObjects);
