function setChannel(channel) {
    const channelTitle = docuemnt.getElementById('js-title');
    
    channelTitle.textContent = channel;
}   //sätta rätt kanal till h1


function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu--show');
}   //tar fram menyn


