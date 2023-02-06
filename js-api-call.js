<html>
<head>

</head>

<body>

<div>
<table >
<tr>
<th>Name</th>
<th>Email</th>
</tr>
<tbody id="users">

</tbody>
</table>
</div>



<script>


//Fetch API
/*
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {

    // ES6 in JavaScript
    let output = '';
    data.map(user => {
      output += `<li>${user.name}</li>`;
    });

    // Show data in UI
    document.getElementById('users').innerHTML = output;

  })
  
    
  fetch('https://example.com/data')
  .then(response => response.json())
  .then(data => {
    // Show Loader
    document.getElementById('loader').style.display = 'block';

    // Show Data in UI
    let output = '';
    data.forEach(item => {
      output += `<li>${item}</li>`;
    });

    document.getElementById('data-list').innerHTML = output;

    // Hide Loader
    document.getElementById('loader').style.display = 'none';

  })
  
  */
  
  const getData = async ()=>{
  
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const res1 = await res.json()
  console.log(res1)
  
   let output = '';
    res1.map(user => {
      output += `<tr>
	 <td> ${user.name}</td>
	 <td> ${user.email}</td>
	  </tr>`;
    });
	
 return  document.getElementById('users').innerHTML = output;
}

getData();

</script>
</body>
</html>
