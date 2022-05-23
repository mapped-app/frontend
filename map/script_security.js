const swup = new Swup();


const mount = () => {
    communityEvents();
    buttonEvents();
}

const unmount = () => {
    removeButtonEvents();
}

const openCommunity = (event) => {
    if (event.target.tagName === 'path') {
        const links = [...document.querySelectorAll('nav a')];
        links.find(link => link.id === event.target.id)?.click();
    }
}

const communityEvents = () => {
    const communitiesEl = document.querySelector('#communities_container');
    communitiesEl?.addEventListener('click', openCommunity);
}

const buttonBackClick = () => document.querySelector('a#ES')?.click();

const buttonEvents = () => {
    const backBtn = document.querySelector('button#back');
    backBtn?.addEventListener('click', buttonBackClick);
}

const removeButtonEvents = () => {
    const backBtn = document.querySelector('button#back');
    backBtn?.removeEventListener('click', buttonBackClick);
}