var today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let cityLocation = document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let todayIcon = document.getElementById("today-icon");
let description = document.getElementById("today-description");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let searchbar = document.getElementById("search-bar");


let nextDay = document.getElementsByClassName("nextDay");
let nextDayIcon = document.getElementsByClassName("nextDay-icon");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let nextDayDescription = document.getElementsByClassName("nextDay-description");
let apiResponse;
let responseData;
monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];

// get data from Api
async function getWeatherData(currentCity = 'cairo') {
  apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9c12bf097e344846844130610222110&q=${currentCity}&days=3`)
  responseData = await apiResponse.json()
  console.log(responseData)
  getTodayWeather();
  getNextDayWeather()
}
getWeatherData();

function getTodayWeather() {

  var date = new Date();
  console.log(date)
  today.innerHTML = days[date.getDay()];
  todayDate.innerHTML = `${date.getDate()} ${ monthName[date.getMonth()]}`;
  cityLocation.innerHTML = responseData.location.name;
  todayDegree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`)
  description.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;

}

function getNextDayWeather() {
  for (var i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
    nextDayIcon[i].setAttribute('src', `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text;
  }
}
searchbar.addEventListener("keyup", function () {
  currentCity = searchbar.value;
  console.log(currentCity);
  getWeatherData(currentCity);
})