let allMenu = [];

// IIFE (Async IIFE (Immediately Invoked Function Expression)) -> Cara ini membungkus fungsi async di dalam tanda kurung, lalu langsung mengeksekusinya di akhir baris fungsi tersebut.
(async () => {
    try {
        const res = await fetch('https://wpu-cafe.vercel.app/api/menu');
        if (!res.ok) {
            throw new Error(`Terjadi Kesalahan: ${res.status}`);
        }
        const data = await res.json();
        allMenu = data.data;
        displayMenu(allMenu);
        console.log(allMenu);
    } catch (err) {
        console.error(err);
    }
})();

function displayMenu(menu) {
    const menuList = document.querySelector(".menu-grid");
    menuList.innerHTML = '';

    menu.forEach((item) => {
        // <div class="menu-card"></div>
        const card = document.createElement('div');
        card.classList.add('menu-card')
        
        //<img src="" alt=""></img>
        const image = document.createElement('img');
        image.src = item.image_url;
        image.alt = item.name;
        card.appendChild(image)

        const name = document.createElement('h2');
        name.textContent = item.name;
        card.appendChild(name);

        menuList.appendChild(card);
    });
}

const search = () => {
    const input = document.querySelector('input');
    const menus = document.querySelectorAll('.menu-card')

    const keyword = input.value.toLowerCase();
    menus.forEach(menu => {
        const keywordValue = menu.textContent.toLowerCase();
        if (keywordValue.includes(keyword)){
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });
}

const button = document.querySelector('.search-button');
button.addEventListener('click', search);

// 1. Fitur mencari menu berdasarkan nama
// 2. .then jadi async await