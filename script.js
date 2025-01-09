const openMenuElement = document.querySelector(".ham-icon");
const closeMenuElement = document.querySelector(".close-icon");
const menuElement = document.querySelector(".menu")

openMenuElement.addEventListener("click", (e) => {
    menuElement.classList.toggle("active");
    openMenuElement.classList.toggle("active");
    closeMenuElement.classList.toggle("active");
})

closeMenuElement.addEventListener("click", (e) => {
    menuElement.classList.toggle("active");
    closeMenuElement.classList.toggle("active");
    openMenuElement.classList.toggle("active");
})