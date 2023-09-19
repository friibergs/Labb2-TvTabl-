const scheduleContainer = document.getElementById('js-schedule');

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu--show');
}

async function getData(channel) {
    const pageLoading = document.querySelector('.hidden');
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
        const data = await getData(channel);
        render(data);

    } catch (error) {
        console.error("Error setting channel:", error)
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
