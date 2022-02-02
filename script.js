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
var api_key="a0aca8a89948154a4182dcecc780b513";




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
  /* $.ajax({
       url:queryURL,
       method:"GET"
   }).then(function(response){*/
    fetch(queryURL)
    .then (response=>response.json())
    .then(data=>{
        console.log(data);
    
            
            var weathericon= data.weather[0].icon;
             var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
             var date=new Date(data.dt*1000).toLocaleDateString();
             $(currentCity).html(data.name +"("+date+")" + "<img src="+iconurl+">");
             //temperature to F
             var tempF = (data.main.temp - 273.15) * 1.80 + 32;
             $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
             //wind speed in MPH
            
             var windsmph=(data.wind.speed*2.237).toFixed(1);
             $(currentWind).html(windsmph+"MPH");
             //console.log(currentWind+"wind");
             //humidity
             
             $(currentHumidity).html(data.main.humidity+"%");
             UVIndex(data.coord.lon,data.coord.lat);
             forecast(data.id);
        if(data.cod==200){
            city1=JSON.parse(localStorage.getItem("cityName"));
            console.log(city1);
            if (city1==null){
            
                city1=[];
                city1.push(city.toUpperCase()
                );
                localStorage.setItem("cityName",JSON.stringify(city1));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    city1.push(city.toUpperCase());
                    localStorage.setItem("cityName",JSON.stringify(city1));
                    addToList(city);
                }
            }
        }

        
});
}

function UVIndex(ln,lt){
    //lets build the url for uvindex.
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ api_key +"&lat="+lt+"&lon="+ln;
  fetch(uvqURL)
  .then (response=>response.json())
  .then(data=>{$(currentUvindex).html(data.value);});
  }
    


//displaying 5 days forecast of the city
function forecast(cityid){
    //var dayOver= false;
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+api_key;
   
    /*fetch(queryforcastURL)
    .then (response=>response.json())
    .then(data=>{
        console.log(data+"helooo");*/
    
        $.ajax({
            url:queryforcastURL,
            method:"GET"
        }).then(function(response){
        console.log(response);
             for(i=0;i<5;i++){
                  var date =new Date((data.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
                  var iconcode= data.list[((i+1)*8)-1].weather[0].icon;
                  var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
                  var tempK= data.list[((i+1)*8)-1].main.temp;
                   var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
                
                   var humidity= data.list[((i+1)*8)-1].main.humidity;

                   $("#fDate"+i).html(date);
                   $("#fImg"+i).html("<img src="+iconurl+">");
                   $("#fTemp"+i).html(tempF+"&#8457");
                   $("#fHumidity"+i).html(humidity+"%");
               
        
              }


          
        });
      } 

$(".btn").on("click",displayWeather);
