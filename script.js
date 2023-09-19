const scheduleContainer = document.getElementById('js-schedule');
const pageLoading = document.getElementById('js-loading');
const menu = document.querySelector('.menu');
const icon = document.querySelector('.menu-icon i');
let isMenuOpen;

function toggleMenu() {

    if (!isMenuOpen) {
        openMenu();
    } else {
        closeMenu();
    }
}


function openMenu() {
    let currentLeft = -300; // Startposition för menyn
    const menuAnimation = setInterval(() => {
        if (currentLeft >= 0) {
            clearInterval(menuAnimation); // Stoppa animationen när menyn är helt öppen
        } else {
            currentLeft += 10; // Ändra positionen gradvis
            menu.style.left = currentLeft + 'px';
        }
    }, 10); // Uppdatera positionen var 10 ms

    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    isMenuOpen = true;
}


function closeMenu() {
    let currentLeft = 0; // Startposition för menyn
    const menuAnimation = setInterval(() => {
        if (currentLeft <= -300) {
            clearInterval(menuAnimation); // Stoppa animationen när menyn är helt stängd
        } else {
            currentLeft -= 10; // Ändra positionen gradvis
            menu.style.left = currentLeft + 'px';
        }
    }, 10); // Uppdatera positionen var 10 ms

    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
    isMenuOpen = false;
}


async function getData(channel) {

    pageLoading.classList.remove('hidden');

    try {
        const response = await fetch(`data/${channel}.json`)

        if (!response.ok) {
            throw new Error("Error, respons not ok");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error, couldn't load data", error);
        throw error;

    } finally {
        pageLoading.classList.add('hidden');
    }
}


async function setChannel(channel) {
    const channelTitle = document.getElementById('js-title');
    channelTitle.innerHTML = channel;

    try {
        pageLoading.classList.remove('hidden');
        scheduleContainer.innerHTML = '';

        const data = await getData(channel);
        render(data);

    } catch (error) {
        console.error("Error setting channel:", error)
    } finally {
        pageLoading.classList.add('hidden');
    }

    closeMenu();
}


function render(data) {
    data.sort((a, b) => new Date(a.start) - new Date(b.start));

    let htmlString = '';

    htmlString += '<ul class="list-group list-group-flush">';

    data.forEach(program => {
        htmlString += `<li class="list-group-item"><strong>${program.start.substr(11, 5)}</strong><div>${program.name}</div></li>`;
    });

    htmlString += '</ul>';

    scheduleContainer.innerHTML = htmlString;

}
