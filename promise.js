

const reg = ()=>{
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("reg done")
              res();
          },100)
          
    })
}

const email = ()=>{
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("email done")
              return res("good");
          },2000)
          
    })
}

const otp = ()=>{
    
    return new Promise((res,rej)=>{
          
          setTimeout(()=>{
              console.log("otp done")
              res();
          },3000)
          
    })
}

reg().then(email().then((res)=>{
     console.log(res)
})).then(otp())
