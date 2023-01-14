<html>
<head>
<title>TOP</title>
<meta content="width=device-width, initial-scale=1" name="viewport" />
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container{

display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
 // for row no need to give diplay flex and give image width 100 %
.media {
    width: 200px;
    padding: 5px;
    margin: 5px 0;
    background-color: #282c34;
    border-radius: 10px;
    position: relative;
    font-family: "Montserrat", sans-serif;
  }

// for column
.media {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 5px;
    margin: 5px 0;
    background-color: #282c34;
    border-radius: 10px;
    position: relative;
    font-family: "Montserrat", sans-serif;
  }
  
   @media (max-width: 550px) {
    .media {
      width: 46%;
    }
  }
  
  .poster {
    border-radius: 10px;
  }
  
  .title {
    width: 100%;
    text-align: center;
    font-size: 17px;
    padding: 8px 0;
  }
  
  .subTitle {
    display: flex;
    justify-content: space-between;
    padding-bottom: 3px;
    padding: 0 2px;
    padding-bottom: 3px;
  }

</style>
</head>
<body>
<div class="container">

<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>

<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>
<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>
<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>
<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>
<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>
<div class="media" color="inherit" style="cursor: pointer;">
<img class="poster" src="https://image.tmdb.org/t/p/w300/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="Minions: The Rise of Gru">
<b class="title">Minions: The Rise of Gru</b>
<span class="subTitle">Movie<span class="subTitle">
2022-06-29</span>
</span>
</div>
</div>
</body>

</html>
