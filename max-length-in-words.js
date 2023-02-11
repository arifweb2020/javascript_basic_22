const sentence = "This is a sentencess with many words";

const maxLength = Math.max(...sentence.split(' ').map(word => word.length));
console.log(maxLength); // Output: 10
