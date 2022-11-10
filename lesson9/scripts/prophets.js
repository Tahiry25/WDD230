const requestURL =
  "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";
const cards = document.querySelector(".cards");


fetch(requestURL)
  .then((res) => res.json())
  .then((data) => { sessionStorage.setItem('prophets', JSON.stringify(data)) })
  
const prophets = JSON.parse(sessionStorage.prophets)
console.log(prophets['prophets'])