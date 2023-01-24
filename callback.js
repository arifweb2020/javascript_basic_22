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


// 3 how to over come from callback hell using promise;


function register(){
    
    return new Promise ((resolve,reject)=>{
        console.log("register user")
        resolve()
    })
    
    
}

function sendemail(){
    
     return new Promise ((resolve,reject)=>{
         console.log("send email")
        resolve()
    })
   
    
}


function login(){
     return new Promise ((resolve,reject)=>{
        console.log("user login")
        resolve()
    })
    
    
}

function getuser(){
    
     return new Promise ((resolve,reject)=>{
          console.log("get user data")
        resolve()
    })
  
    
}

function displayuser(){
    
     return new Promise ((resolve,reject)=>{
         console.log("diplay user data")
        resolve()
    })
   
    
}

register().then(sendemail).then(login).then(getuser).then(displayuser).catch((err)=> "some went wrong")


console.log("other app work here")

// using async await this make code neat clean

async function auth(){
    await register();
      await sendemail();
        await login();
          await getuser();
            await displayuser();
}

auth().then(()=>{
    console.log("now call me ")
})

