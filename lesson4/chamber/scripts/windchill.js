const url =
  "https://api.openweathermap.org/data/2.5/weather?zip=84045,us&appid=6253bdd6164eff3db994458b35c2dbe4&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      injectWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function injectWeather(data) {
  if (path.endsWith("chamber/")) {
    const icon = document.querySelector(".weather > div > img");
    const temp = document.querySelector(".weather > div > p");
    const condition = document.querySelector(".weather #condition");
    const windSpeed = document.querySelector(".weather #wind-speed >span");
    const windChill = document.querySelector(".weather #wind-chill > span");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}.png`
    );

    // console.log(windChill(data["wind"]["speed"], data["main"]["temp"]));

    temp.textContent = `${Math.round(data["main"]["temp"], 1)}° F`;
    condition.textContent = data["weather"][0]["description"];
    windSpeed.textContent = Math.round(data["wind"]["speed"], 1);
    windChill.textContent = windChillCalc(
      data["wind"]["speed"],
      data["main"]["temp"]
    );
  }
}

// calculate windchill

function windChillCalc(wind, temp) {
  const chill =
    0.6215 * temp +
    35.74 -
    35.75 * Math.pow(wind, 0.16) +
    0.4275 * temp * Math.pow(wind, 0.16);

  if (wind <= 3) {
    return "N/A";
  } else {
    return `${Math.round(chill, 1)}° F`;
  }
}
