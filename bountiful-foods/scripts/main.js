function toggleMenu() {
    const nav = document.querySelector("nav")
    nav.classList.toggle("open");
    // console.log(nav)
}

const x = document.querySelector(".hamburgerBtn");
x.onclick = toggleMenu;