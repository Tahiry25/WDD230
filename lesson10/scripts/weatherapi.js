// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");


const url =
    "https://api.openweathermap.org/data/2.5/weather?zip=84045,us&appid=6253bdd6164eff3db994458b35c2dbe4&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      currentTemp.textContent = data['main']['temp']
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@4x.png`
      );
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();