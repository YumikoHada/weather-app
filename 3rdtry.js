 // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
var lat;
var long;
var url;
function getLocation() {
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(getPosition);
  } else {
  	alert("Oops! This browser does not support HTML Geolocation.");
  }
}
function getPosition(position) {
	lat = position.coords.latitude;
	long = position.coords.longitude;
	console.log(lat,long);
 url = 'https://api.darksky.net/forecast/cb86a6341a243355afaba5b5cd7a19d2/'+lat+','+long+'?units=si';
  // url = 'https://api.darksky.net/forecast/cb86a6341a243355afaba5b5cd7a19d2/34.6777642,135.4160242?units=si';
  getData(url);
}

function getData(url) {
	getLocation();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	var jRes = JSON.parse(xhttp.responseText);
      document.getElementById("icon").innerHTML = '<img src=images/'+jRes.currently.icon+'.png>';;
      document.getElementById("temp").innerHTML = jRes.currently.temperature.toFixed(0) + '<span id="celsius">&deg;C</span>';
      document.getElementById("conditions").innerHTML = jRes.currently.summary;
      var perc = parseInt(parseFloat(jRes.currently.precipProbability)*100);
      document.getElementById("percentage").innerHTML = perc +'<span id="percent">%</span>';
      document.getElementById("place").innerHTML = jRes.timezone;
      var today = new Date();
      var month = today.getMonth();
      var monthStr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][month];
      var date = today.getDate();
      var dayOfWeek = today.getDay();
      var dayOfWeekStr = [ "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat" ][dayOfWeek] ;
      var time = date +'.'+ monthStr + '.' + '('+dayOfWeekStr+')';
      document.getElementById("date").innerHTML = time;

    }
  };
//  var url = 'https://api.darksky.net/forecast/cb86a6341a243355afaba5b5cd7a19d2/16.3932911,120.5854669?units=si';
  xhttp.open("GET", 'https://cors-anywhere.herokuapp.com/' +url, true);
  xhttp.send(); 
}
document.addEventListener("DOMContentLoaded", getLocation);