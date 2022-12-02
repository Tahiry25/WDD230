let directory = "../chamber/json/directory.json";

fetch(directory)
  .then((res) => res.json())
  .then((data) => {
    const list = data;
    return list;
  })
  .then((list) => {
    for (i = 1; i <= 3; i++){
      pickRandom(list);
    }
  });

function pickRandom(arr) {
  let spotlightParent = document.querySelector(".spotlight");
  let random = Math.floor(Math.random() * arr.length)
  let container = document.createElement('div')
  // company name
  let company = document.createElement('h3')
  company.textContent = arr[random]['name']
  // company logo
  let logo = document.createElement("img")
  logo.setAttribute("src", arr[random]["logo"]);
  logo.setAttribute("alt", arr[random]["name"]);
  // company address
  let address = document.createElement('p')
  // company phone
  let phone = document.createElement("p");
  phone.textContent = arr[random]["phone"];
  address.textContent = arr[random]['address']
  container.appendChild(company)
  container.appendChild(logo)
  container.appendChild(address)
  container.appendChild(phone)
  spotlightParent.appendChild(container)
}