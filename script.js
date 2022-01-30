//declaring variables
var city="";
var cityName=$("#cityname");
var search=$(".btn");
var currentCity=$("#current-city");
var currentTemperature=$("#temperature");
var currentWind=$("#wind-speed");
var currentHumidity=$("#humidity");
var currentUvindex=$("#uv-index");
var city1=[];

//search city if it exists in the storage

function find(c){
    for (var i=0;i<city1.length;i++){
        if(c.toUpperCase()===city1[i]){
            return -1;
        }
    }
  return 1;
}
//SET the API key
var api_key="473a19f6022648369699b1dffb273802";
;

function displayWeather(event){
    event.preventDefault();
    if(cityName.val().trim()!==""){
        city=cityName.val().trim();
        currentWeather(city);
    }
}
function currentWeather(city){
    //build URL to get data from server
var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" +city + "&APPID=" +api_key;
   $.ajax({
       url:queryURL,
       method:"GET"
   }).then(function(response){
            console.log(response);
            var weathericon= response.weather[0].icon;
             var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
             var date=new Date(response.dt*1000).toLocaleDateString();
             $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
             //temperature to F
             var tempF = (response.main.temp - 273.15) * 1.80 + 32;
             $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
             //wind speed in MPH
            
             var windsmph=(response.wind.speed*2.237).toFixed(1);
             $(currentWind).html(windsmph+"MPH");
             console.log(currentWind+"wind");
             //humidity
             
             $(currentHumidity).html(response.main.humidity+"%");
             UVIndex(response.coord.lon,response.coord.lat);
        
        


});

}

function UVIndex(ln,lt){
    //lets build the url for uvindex.
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ api_key +"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $(currentUvindex).html(response.value);
            });
}


$(".btn").on("click",displayWeather);
