const submit = document.querySelector('#submit');
const listContainer = document.querySelector(".listcontainer .list");
const input = document.querySelector("#favchap");

const close = document.querySelectorAll('.close');

submit.onclick = function () {
    const li = document.createElement('li');
    
    const chap = document.createElement('p');
    chap.textContent = input.value;
    const close = document.createElement('button');
    close.className = 'close';
    close.textContent = 'x';
    if (input.value != '') {
        console.log(input);
        li.appendChild(chap);
        li.appendChild(close);
        listContainer.appendChild(li);

        submit.textContent = "Chapter Added!";
    } else { submit.textContent = "Cannot be Empty"; }

    setInterval(function () {
      submit.textContent = "Add Chapter";
    }, 1000);
}