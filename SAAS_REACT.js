// make one Styles folder

// Navbar.scss
/* one way */
$blackColor: #000;

.navbar{
	
	width:100%;
	height:100%;
	background:$blackColor
}

/* other way */
@import "../Variables/Variable.scss

.navbar{
	
	width:100%;
	height:100%;
	background:$blackColor
}

.navbar a {
	color:$whiteColor;
	font-family:$titleFont;
}

button{
	@include buttonStyle($blackColor,35px);
}

// make one variable folder 

// Variable.scss

/* COLOR*/
$blackColor: #000;
$whiteColor:#fff;

/* Fonts*/

$titleFont : Arial,Helvetica , sans-serif;
$bodyFont : "Times New Roman", Times,serif;


@mixin buttonStyle($color,$fontSize){
	width:200px;
	background:$color;
	font-size:$fontSize;
}





