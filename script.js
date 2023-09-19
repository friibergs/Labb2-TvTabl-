const scheduleContainer = document.getElementById('js-schedule');
const pageLoading = document.getElementById('js-loading');
const menu = document.querySelector('.menu');
const icon = document.querySelector('.menu-icon i');


function toggleMenu() {

    menu.classList.toggle('menu--show');

    if (menu.classList.contains('menu--show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// let isOpen = false;

// function slideMenuIn() {
//     let left = -300;
//     const interval = 10;
//     const step = 10;
// const slideInterval = setInterval= () => {
//     if (left >= 0) {
//         clearInterval(slideInterval);
//         isOpen = true;
//     } else {
//         menu.c
//     }
// }

// }


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
