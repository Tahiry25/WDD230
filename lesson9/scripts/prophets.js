const requestURL =
  "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";
const cards = document.querySelector(".cards");


fetch(requestURL)
  .then((res) => res.json())
  .then((data) => { sessionStorage.setItem('prophets', JSON.stringify(data)) })
  
const prophets = JSON.parse(sessionStorage.prophets)['prophets']

function addProphets() {
  prophets.forEach((prophet) => {
    let node = document.createElement("div");

    // name
    let name = document.createElement("h2");
    name.textContent = prophet["name"] + " " + prophet["lastname"];
    node.appendChild(name);

    // Date of Birth
    let dob = document.createElement("p");
    dob.textContent = "Date of Birth: " + prophet["birthdate"];
    node.appendChild(dob);

    // Place of Birth
    let pob = document.createElement("p");
    pob.textContent = "Place of Birth: " + prophet["birthplace"];
    node.appendChild(pob);

    // Profile image
    let image = document.createElement("img");
    image.setAttribute("src", prophet["imageurl"]);
    image.setAttribute(
      "alt",
      `${prophet["name"]} ${prophet["lastname"]}'s picture`
    );
    node.appendChild(image);

    cards.appendChild(node);
    console.log(prophet);
  });
}

addProphets();