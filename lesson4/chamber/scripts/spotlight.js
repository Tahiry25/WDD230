let directory = "../chamber/json/directory.json";

fetch(directory)
  .then((res) => res.json())
  .then((data) => {
    const list = data;
    return list;
  })
  .then((list) => {
      spotlightParent = document.querySelector('.spotlight')
      pickRandom(list)
  });

function pickRandom(arr) {
    console.log(Math.floor(Math.random() * arr.length))

}