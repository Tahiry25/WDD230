const fruits = "https://brotherblazzard.github.io/canvas-content/fruit.json";

const select1 = document.querySelector('#fruit1')
const select2 = document.querySelector('#fruit2')
const select3 = document.querySelector('#fruit3')

async function apiFetch() {
  try {
    const response = await fetch(fruits);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      data.forEach((fruit) => {
        addOption(fruit.name, select1);
        addOption(fruit.name, select2);
        addOption(fruit.name, select3);
      })
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function addOption(fruitName, container) {
  const option = document.createElement("option");
  option.textContent = fruitName;
  container.appendChild(option);
}