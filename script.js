const openMenuElement = document.querySelector(".ham-icon");
const closeMenuElement = document.querySelector(".close-icon");
const menuElement = document.querySelector(".menu");
const links = document.querySelectorAll(".links");
const searchBox = document.querySelector(".search-box");
const search = document.querySelector("#search");
const loading=document.querySelector('.loader-div')

openMenuElement.addEventListener("click", (e) => {
    menuElement.classList.toggle("active");
    openMenuElement.classList.toggle("active");
    closeMenuElement.classList.toggle("active");
});

closeMenuElement.addEventListener("click", (e) => {
    menuElement.classList.toggle("active");
    closeMenuElement.classList.toggle("active");
    openMenuElement.classList.toggle("active");
});

links.forEach((link) => {
    link.addEventListener("click", (e) => {
        loadData(e.target.id);
        newsBox.innerHTML = "";
    });
});

searchBox.addEventListener("submit", (e) => {
    e.preventDefault();
    loadData(search.value);
    search.value = "";
    newsBox.innerHTML = "";
});

let newsBox = document.querySelector(".news-box");

function fetchApi(keyword) {
    let url = `//newsapi.org/v2/everything?q=${keyword}&apiKey=215beca6dcc1419a97b2b84cd0cc67af`;
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                console.log("Error fetching the API", response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log("Error getting response", error);
        });
}

async function loadData(keyword = "everything") {
    loading.classList.remove('hidden')
    let a = await fetchApi(keyword);
    console.log("Data is:", a);
    let dataArr = a.articles;
    let dataSet = [...dataArr];
    console.log("Final data is:", dataSet);
    dataSet.forEach((element, index) => {
        console.log(
            !element.urlToImage === "" &&
                !element.description === "[Removed]" &&
                !element.title === "[Removed]" &&
                !element.url === "https://removed.com"
        );
        if (
            element.urlToImage &&
            element.description !== "[Removed]" &&
            element.title !== "[Removed]" &&
            element.url !== "https://removed.com"
        ) {
            let card = document.createElement("div");
            card.className = "card";
            let img = document.createElement("img");
            img.className = "image";
            let title = document.createElement("div");
            title.className = "title";
            let desc = document.createElement("div");
            desc.className = "desc";

            img.src = element.urlToImage;
            img.alt = "Image not available";
            card.appendChild(img);
            title.innerText = element.title;
            card.appendChild(title);
            if (element.description) {
                desc.innerText =
                    element.description.length > 10
                        ? element.description.substring(0, 100) + "...."
                        : element.description;
            }
            card.onclick = () => {
                window.open(element.url, "_blank");
            };

            card.appendChild(desc);
            loading.classList.add('hidden')
            newsBox.appendChild(card);
        }
    });
}

loadData();
