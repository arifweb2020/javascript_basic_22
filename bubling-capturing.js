<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Document</title>
<style>

</style>
</head>
<body style="background:purple">

<div id="myDiv" style="background:orange;width:600px;padding:40px; margin-top:60px">

<button id="btn">click</button>

</div>

<script>


let b = document.getElementById("btn");
let d = document.getElementById("myDiv");


// by default it is bubling
/*
b.addEventListener('click', btnClicked);
d.addEventListener('click', divClicked);

document.body.addEventListener('click', bodyClicked)

 function btnClicked(){
 console.log("btnnn")
 }
 
  function divClicked(){
 console.log("div")
 }
 
  function bodyClicked(){
 console.log("body")
 }
 
 */
 
 // to make cpaturing add param true
 /*
 b.addEventListener('click', btnClicked , true);
d.addEventListener('click', divClicked, true);

document.body.addEventListener('click', bodyClicked, true)

 function btnClicked(){
 console.log("btnnn")
 }
 
  function divClicked(){
 console.log("div")
 }
 
  function bodyClicked(){
 console.log("body")
 }
 
 */
 
 
 // to stop propgation

 b.addEventListener('click', btnClicked);
d.addEventListener('click', divClicked);

document.body.addEventListener('click', bodyClicked)

 function btnClicked(event){
 console.log("btnnn");
 event.stopPropagation();
 }
 
  function divClicked(){
 console.log("div")
 }
 
  function bodyClicked(){
 console.log("body")
 }

</script>
</body>
</html>
