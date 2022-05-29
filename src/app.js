import { Mapped } from '../src/mapped.js';
import { showCityData } from '../src/city-data.js'
import { showSites } from '../src/sites-data.js'
import { getCityId } from '../src/markCommunity.js'
import { getBestStays } from '../src/bestAndChipestHotels.js'

const swup = new Swup();
function setMappedData() {
    window.mapped = new Mapped();
}

const openCommunity = (event) => {
    if (event.target.tagName === 'path') {
        const links = [...document.querySelectorAll('nav a')];
        links.find(link => link.id === event.target.id)?.click();
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
    setMappedData();
    showCityData();
    showSites();
    getCityId();
    getBestStays();

}

const unmount = () => {
    //removeCommunityEvents();
    removeButtonEvents();
}


mount();

swup.on('willReplaceContent', unmount);

swup.on('contentReplaced', mount);