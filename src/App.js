import React, { useEffect, useState } from "react";

import "./style.css";
// const fetchLoc = async () => {
//   return await fetch(`https://ip-api.io/json/1.2.3.4`)
//     .then((response) => {console.log(response); return response;})
//     .then((data) => { console.log(data);return data;});
// };
async function getWeather(latitude, longitude) {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=81627baf0438802a0f63070e9596f4c1`
  )
    .then((response) => response.json())
    .then((data) => data.current);
}
const getToday = () => {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var date = new Date();
  return `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};
const getWeatherDetails = (data, temp) => {
  let { main, icon } = data;
  let imgUrl = `http://openweathermap.org/img/w/${icon}.png`;
  return (
    <div>
      <div>{main}</div>
      <img src={imgUrl} alt="weather img" />
      <div>
        {temp}
        {String.fromCharCode(176)}C
      </div>
    </div>
  );
};
const getCurrentTime = () => {
  let date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}`;
};
const getTime = (sunrise, sunset) => {
  let srise = new Date(sunrise * 1000).toTimeString().split(" ")[0].split(":");
  let sset = new Date(sunset * 1000).toTimeString().split(" ")[0].split(":");
  return (
    <div className="time-div">
      <div className="timeClass">
        <img
          alt="clock icon"
          src="https://cdn0.iconfinder.com/data/icons/meeting-time-add-on/48/v-02-512.png"
          height="100"
          width="100"
        />
        <div className="currentTime">{getCurrentTime()}</div>
      </div>
      <div className="displayFlex">
        <div className="paddingClass">
          Sunrise {srise[0]}:{srise[1]}
        </div>
        <div className="paddingClass">
          Sunset {sset[0]}:{sset[1]}
        </div>
      </div>
    </div>
  );
};
export default function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    sunrise: 0,
    sunset: 0,
    weather: [{ main: "", icon: "50d", description: "", id: "" }],
    temp: 0
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    var latitude, longitude;

    const success = async (pos) => {
      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;
      var data = await getWeather(latitude, longitude);
      setLoading(false);
      setWeatherData(data);
    };

    const error = (err) => {
      setLoading(false);
      setError(true);
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }, []);

  return (
    <div className="main-div">
      {loading ? (
        "fetching weather details..."
      ) : error ? (
        "unable to fetch weather details"
      ) : (
        <div>
          <div className="data-div">
            <div className="title">
              <span className="color-title">Global</span>
              <span className="weather-title">Weather</span>
            </div>
            <div>
              <div className="loc-name">RIO DEJANEIRO</div>
              <div className="date-div">{getToday()}</div>
            </div>
          </div>
          <div className="data-div">
            {getTime(weatherData.sunrise, weatherData.sunset)}
            {getWeatherDetails(weatherData.weather[0], weatherData.temp)}
          </div>
        </div>
      )}
    </div>
  );
}
