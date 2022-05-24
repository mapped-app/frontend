import { Mapped } from './mapped.js';
import { changeLocation } from './src/add-data';

const swup = new Swup();
window.mapped = new Mapped();

(function removeSessionUser() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
})();

const openCommunity = (event) => {
    if (event.target.tagName === 'path') {
        const links = [...document.querySelectorAll('nav a')];
        const place = links.find(link => link.id === event.target.id);
        if (place) {
            changeLocation();
            place.click();
        }
    }
}

const communityEvents = () => {
    const communitiesEl = document.querySelector('.map');
    communitiesEl?.addEventListener('click', openCommunity);
}


const removeCommunityEvents = () => {
    const communitiesEl = document.querySelector('.map');
    communitiesEl?.removeEventListener('click', openCommunity);
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


const mount = () => {
    communityEvents();
    buttonEvents();
}

const unmount = () => {
    //removeCommunityEvents();
    removeButtonEvents();
}


mount();

swup.on('willReplaceContent', unmount);

swup.on('contentReplaced', mount);