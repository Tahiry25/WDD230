const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

button.onclick = function () {
    const chapter = input.value;

    const listItem = document.createElement('li');
    const title = document.createElement('p');
    const closeBtn = document.createElement('button');

    listItem.appendChild(title);
    title.textContent = chapter;
    listItem.appendChild(closeBtn);
    closeBtn.textContent = "❌";
    list.appendChild(listItem);

    closeBtn.onclick = function () {
        list.removeChild(listItem);
        input.focus();
    }

    input.focus();
    input.value = '';
}