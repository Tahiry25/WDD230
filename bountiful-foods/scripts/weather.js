const currentTemp = document.querySelector(".weather_info #currentTemp");
const weatherIcon = document.querySelector(".weather_info #weatherIcon");
const humidity = document.querySelector(".weather_info #currentHumidity");
const condition = document.querySelector(".weather_info #weatherCondition");

const day1 = document.querySelector(".three_day_forecast #day1 p:nth-child(1)");
const day2 = document.querySelector(".three_day_forecast #day2 p:nth-child(1)");
const day3 = document.querySelector(".three_day_forecast #day3 p:nth-child(1)");
const day1_temp = document.querySelector(".three_day_forecast #day1 p:nth-child(2)");
const day2_temp = document.querySelector(".three_day_forecast #day2 p:nth-child(2)");
const day3_temp = document.querySelector(".three_day_forecast #day3 p:nth-child(2)");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const url =
  "https://api.openweathermap.org/data/2.5/forecast?zip=92008,us&appid=6253bdd6164eff3db994458b35c2dbe4&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      currentTemp.textContent = `${Math.ceil(
        data["list"][0]["main"]["temp"]
      )} °`;
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data["list"][0]["weather"][0]["icon"]}@4x.png`
      );
      humidity.textContent = `${data["list"][0]["main"]["humidity"]} %`;
      condition.textContent = data["list"][0]["weather"][0]["description"];
      day1.textContent = weekday[getDay(data["list"][8]["dt_txt"])];
      day1_temp.textContent = `${Math.ceil(
        data["list"][8]["main"]["temp_max"]
      )} °`;
        day2.textContent = weekday[getDay(data["list"][15]["dt_txt"])];
        day2_temp.textContent = `${Math.ceil(
          data["list"][15]["main"]["temp_max"]
        )} °`;
        day3.textContent = weekday[getDay(data["list"][24]["dt_txt"])];
        day3_temp.textContent = `${Math.ceil(
          data["list"][24]["main"]["temp_max"]
        )} °`;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch()

function getDay(date) {
    date = new Date(date);
    return date.getDay()
}