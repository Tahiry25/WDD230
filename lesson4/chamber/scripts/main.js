let path = window.location.pathname

function toggleMenu() {
  // alert('test');
  document.getElementById("primaryNav").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

let date = new Date().toUTCString();
document.getElementById("current").innerHTML = date;

// Lazy loading
const images = document.querySelectorAll("[data-src]");
console.log(images);

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;
}

const imgOptions = {
  threshold: 1,
  rootMargin: "0px 0px 100px 0px",
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});

// visit count
const today = new Date();
const userStat = {};
userStat.currentDate = today;
let visited = ""
if (localStorage.getItem("visited")) {
  	visited += localStorage.getItem("visited");
} else {
	localStorage.setItem("visited", today)
	visited += localStorage.getItem("visited");
}


function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

difference = dateDiffInDays(new Date(visited), today);

document.getElementById("visit_count").textContent = difference;


// Join page

function changeState() {
  let choice = document.querySelector("select#mlevel").value;
  console.log(choice + "_pkg");
  document.querySelectorAll(".membership_grid > *")[0].style.backgroundColor =
  document.querySelectorAll(".membership_grid > *")[1].style.backgroundColor =
  document.querySelectorAll(".membership_grid > *")[2].style.backgroundColor =
  document.querySelectorAll(".membership_grid > *")[3].style.backgroundColor =
    "transparent";

  document.querySelector(`#${choice}_pkg`).style.backgroundColor = "#25A55F";
}

if (path.includes('join')) {
  document.querySelector('input#date').value = new Date()
  const selectElmnt = document.querySelector('select#mlevel')
  selectElmnt.onchange = changeState;
}

// Directory page
const requestURL =
  "../chamber/json/directory.json";

fetch(requestURL)
  .then((res) => res.json())
  .then((data) => {
    const list = data;
    return list;
  })
  .then((list) => {
    localStorage.setItem("list", JSON.stringify(list));
    if (path.includes('directory')) {
      addTiles(list);
    }
  });

function addTiles(array) {
  const main = document.querySelector(".directory main");
  main.classList.add('cards');
  const cards = document.querySelector(".directory .cards");
  array.forEach((list) => {
    let node = document.createElement("div");

    // name
    let name = document.createElement("h2");
    name.textContent = list["name"];
    node.appendChild(name);

    // Profile image
    let image = document.createElement("img");
    image.setAttribute("src", list["logo"]);
    image.setAttribute(
      "alt",
      `${list["name"]}'s logo`
    );
    node.appendChild(image);

    // Phone Number
    let number = document.createElement("p");
    number.textContent = "Phone: " + list["phone"];
    node.appendChild(number);

    // Address
    let address = document.createElement("p");
    address.textContent = list["address"];
    node.appendChild(address);

    cards.appendChild(node);
  });
}

function addList(array) {
  const main = document.querySelector(".directory main");
  main.classList.add("list");

  array.forEach((list) => {
    let node = document.createElement("div");
    let nodeChild = document.createElement('div')
    // image
    let image = document.createElement("img");
    image.setAttribute("src", list["logo"]);
    image.setAttribute("alt", `${list["name"]}'s logo`);
    image.setAttribute("width", "150");
    node.appendChild(image);

    // name
    let name = document.createElement("h2");
    name.textContent = list["name"];
    nodeChild.appendChild(name);

    // Phone Number
    let number = document.createElement("p");
    number.textContent = "Phone: " + list["phone"];
    nodeChild.appendChild(number);

    // Address
    let address = document.createElement("p");
    address.textContent = `Address ${list["address"]}`;
    nodeChild.appendChild(address);

    node.appendChild(nodeChild)

    main.appendChild(node);
  })
}

function tiles(array) {
  let elmt = document.querySelector(".directory main");
  elmt.classList.remove("list");
  elmt.innerHTML = "";
  addTiles(array)
}

function list(array) {
  let elmt = document.querySelector(".directory main");
  elmt.classList.remove('cards')
  elmt.innerHTML = "";
  addList(array);
}

// Weather

const url =
  "https://api.openweathermap.org/data/2.5/weather?zip=84045,us&appid=6253bdd6164eff3db994458b35c2dbe4&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      injectWeather(data)
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
    const windSpeed = document.querySelector('.weather #wind-speed >span')
    const windChill = document.querySelector('.weather #wind-chill > span')
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