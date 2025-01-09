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




console.log('NewsApp')

let main = document.querySelector('.main')


function fetchApi() {
    let url = '//newsapi.org/v2/everything?q=everything&apiKey=215beca6dcc1419a97b2b84cd0cc67af'
    return fetch(url).then((response) => {
        if (!response.ok) {
            console.log('Error fetching the API', response.statusText);
        }
        return response.json()
    })
        .then((data) => {
            console.log(data)
            return data;
        }
        ).catch((error) => {
            console.log('Error getting response', error)
        })

}



async function loadData() {
    let a = await fetchApi()
    console.log('Data is:', a)
    let data = a.articles;
    console.log('Final data is:', data)
    data.forEach((element, index) => {
        console.log(!element.urlToImage === "" && !element.description ==="[Removed]" && !element.title ==="[Removed]" && !element.url === "https://removed.com")
        if (element.urlToImage  && element.description !=="[Removed]" && element.title !=="[Removed]" && element.url !== "https://removed.com") {

            let card = document.createElement('div')
            card.className = 'card'
            let img = document.createElement('img')
            img.className = 'image'
            let title = document.createElement('div')
            title.className = 'title'
            let desc = document.createElement('div')
            desc.className = 'desc'
            let btn = document.createElement('button')
            btn.className = 'btn'


            img.src = element.urlToImage
            card.appendChild(img)
            title.innerText = element.title
            card.appendChild(title)
            if (element.description) {
                desc.innerText = element.description.length > 10 ? element.description.substring(0, 100) + '....' : element.description
            }
            btn.innerText = 'Click Here'
            btn.onclick = () => {
                window.open(element.url, '_blank')
            }


            card.appendChild(desc)
            card.appendChild(btn)


            main.appendChild(card)
        }




    });

}

loadData()