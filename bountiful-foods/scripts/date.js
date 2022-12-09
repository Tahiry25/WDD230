const date_container = document.querySelector('.weather_container .city_info p:nth-child(2)');

function getCurrentDate(container) {
  date = new Date();
  formatedDate = date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  container.textContent = formatedDate
  return formatedDate
}

getCurrentDate(date_container)