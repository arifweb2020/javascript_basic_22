<script>

let arr = [1,2,4,5,90]

function mapPolyfill(x,cb){

      let newArr = [];
	  
	  for (let i = 0; i < x.length ; i++){
	     newArr.push(cb(x[i]))
	  }
	  
	  return newArr;

}

function square(y){
 return y * y
}

console.log(mapPolyfill(arr,square))


// filter


let arr1 = [1,2,4,5,90,7]

function filPolyfill(x,cb){

      let filterArr = [];
	  
	  for (let i = 0; i < x.length ; i++){
	  if(cb(x[i])){
	     filterArr.push(x[i])
	  }
	     
	  }
	  
	  return filterArr;

}

function even(y){
 if(y%2 == 0){
   return y
 }
}

console.log(filPolyfill(arr1,even))

</script>
