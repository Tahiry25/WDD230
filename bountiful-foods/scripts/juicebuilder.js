const fruits = "https://brotherblazzard.github.io/canvas-content/fruit.json";

const select1 = document.querySelector('#fruit1')
const select2 = document.querySelector('#fruit2')
const select3 = document.querySelector('#fruit3')

async function apiFetch() {
  try {
    const response = await fetch(fruits);
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("fruits", JSON.stringify(data));
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

// listen to submit btn click
const submitBtn = document.querySelector('#submitBtn')

// get all input values
function allValues() {
  const inputValues = getValues("#drinkBuilder input");
  const selectValues = getValues("#selectContainer select");
  sessionStorage.setItem('selectedFruit', JSON.stringify(selectValues))
  const instruction = document.querySelector('#instruction textarea').value;
  return [inputValues, selectValues, instruction];
}

function getValues(elements) {
  const elmts = document.querySelectorAll(elements);
  const values = Array.from(elmts).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );
  return values
}

function updateConfPage() {
  const currentDate = new Date();
  const element = document.querySelector(".orderConfirmation");
  const customerInputs = allValues();
  console.log(customerInputs)
  document.querySelector('.orderConfirmation .fname').textContent = customerInputs[0].fname;
  document.querySelector(".orderConfirmation .email").textContent = customerInputs[0].email;
  document.querySelector('.orderConfirmation .phone').textContent = customerInputs[0].tel;

  const fruits = `${customerInputs[1].fruit1}, ${customerInputs[1].fruit2}, ${customerInputs[1].fruit3}`;
  document.querySelector(".orderConfirmation .fruitList").textContent = fruits;

  document.querySelector(".orderConfirmation .note").textContent = customerInputs[2];
  document.querySelector(
    ".orderConfirmation .date"
  ).textContent = `${currentDate.toLocaleString()}`;
  totalCarb();
  totalProtein();
  totalFat();
  totalSugar();
  totalCalories()
  element.classList.add("visible");

  if (localStorage.submittedOrder) {
    amount = localStorage.submittedOrder
    localStorage.setItem('submittedOrder', parseInt(amount) + 1)
  } else { localStorage.setItem("submittedOrder", 1); }
  document.querySelector('.fresh #submitBtn').remove();
}

function totalCarb() {
  const data = JSON.parse(sessionStorage.selectedFruit)
  fruitarray = []
  total = 0
  for ([key, value] of Object.entries(data)) {
    fruitarray.push(value)
  }

  allFruits = JSON.parse(sessionStorage.fruits)

  fruitarray.forEach((fruit) => {
    a = allFruits.find(({ name }) => name === fruit)
    total += a.nutritions.carbohydrates;
  })
  document.querySelector(".orderConfirmation .carbs").textContent = total + ' g';
}

function totalProtein() {
  const data = JSON.parse(sessionStorage.selectedFruit);
  fruitarray = [];
  total = 0;
  for ([key, value] of Object.entries(data)) {
    fruitarray.push(value);
  }

  allFruits = JSON.parse(sessionStorage.fruits);

  fruitarray.forEach((fruit) => {
    a = allFruits.find(({ name }) => name === fruit);
    total += a.nutritions.protein;
  });
  document.querySelector(".orderConfirmation .protein").textContent =
    Math.round(total * 100) / 100 + " g";
}

function totalFat() {
  const data = JSON.parse(sessionStorage.selectedFruit);
  fruitarray = [];
  total = 0;
  for ([key, value] of Object.entries(data)) {
    fruitarray.push(value);
  }

  allFruits = JSON.parse(sessionStorage.fruits);

  fruitarray.forEach((fruit) => {
    a = allFruits.find(({ name }) => name === fruit);
    total += a.nutritions.fat;
  });
  document.querySelector(".orderConfirmation .fat").textContent =
    Math.round(total * 100) / 100 + " g";
}

function totalSugar() {
  const data = JSON.parse(sessionStorage.selectedFruit);
  fruitarray = [];
  total = 0;
  for ([key, value] of Object.entries(data)) {
    fruitarray.push(value);
  }

  allFruits = JSON.parse(sessionStorage.fruits);

  fruitarray.forEach((fruit) => {
    a = allFruits.find(({ name }) => name === fruit);
    total += a.nutritions.sugar;
  });
  document.querySelector(".orderConfirmation .sugar").textContent =
    Math.round(total * 100) / 100 + " g";
}

function totalCalories() {
  const data = JSON.parse(sessionStorage.selectedFruit);
  fruitarray = [];
  total = 0;
  for ([key, value] of Object.entries(data)) {
    fruitarray.push(value);
  }

  allFruits = JSON.parse(sessionStorage.fruits);

  fruitarray.forEach((fruit) => {
    a = allFruits.find(({ name }) => name === fruit);
    total += a.nutritions.calories;
  });
  document.querySelector(".orderConfirmation .calories").textContent = total + ' cals';
}

// submitBtn.onclick = function () {
//   console.log(updateConfPage());
// };

const form = document.querySelector(".fresh #form");
console.log(form);
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);