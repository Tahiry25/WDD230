function toggleMenu() {
    const nav = document.querySelector("nav")
    nav.classList.toggle("open");
    // console.log(nav)
}

const x = document.querySelector(".hamburgerBtn");
x.onclick = toggleMenu;

if (
  window.location.pathname ==
    "/wdd230/bountiful-foods/" ||
    window.location.pathname == "/bountiful-foods/"
) {
    const container = document.querySelector(".call_to_action #drinks");
    if (localStorage.submittedOrder) {
        container.textContent = localStorage.submittedOrder
    }
}