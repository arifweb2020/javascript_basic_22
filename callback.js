// sync

function register(){
    console.log("register user")
}

function sendemail(){
    console.log("send email")
}

function login(){
    console.log("user login")
}

function getuser(){
    console.log("get user data")
}

function displayuser(){
    console.log("diplay user data")
}

register();
sendemail();
login();
getuser();
displayuser();

console.log("other app work here")

//  using callback


function register(reg){
    console.log("register user")
    reg()
}

function sendemail(emailcb){
    console.log("send email")
    emailcb();
}


function login(lg){
    console.log("user login")
    lg()
}

function getuser(user){
    console.log("get user data")
    user()
}

function displayuser(){
    console.log("diplay user data")
    
}

register(()=>{
   return sendemail(()=>{
     return  login(()=>{
        return   getuser(()=>{
               displayuser(); 
           });
       });
   });
});


console.log("other app work here")

