let path = window.location.pathname

function toggleMenu() {
  // alert('test');
  document.getElementById("primaryNav").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

let date = new Date().toUTCString();
if (path.includes('discover')) {
  document.getElementById("current").innerHTML = date;
}

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

if (path.includes('discover')) {
  document.getElementById("visit_count").textContent = difference;
}


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
