
prototype are mechanism by which javascript ojbject inherits features from one another 
<script>


const user = {

   getName : function(){
   
     return this.name
   },

   getAge : function(){
   
     let age = new Date().getFullYear() - this.age;
	 
	 return age
   }


}

const student = {
    
	name : "rehan",
	age : 20

}

const teacher = {
    
	name : "Pathak",
	age : 40

}

teacher.__proto__ = user
student.__proto__ = user


console.log(student.getName())
console.log(teacher.getName())







</script>
