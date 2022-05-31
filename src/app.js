import { Mapped } from '../src/mapped.js';
import { showCityData } from '../src/city-data.js'
import { createTravel } from '../src/travel-data.js';
import { showSites } from '../src/sites-data.js'
import { getCityId } from '../src/markCommunity.js'
import { getBestAndChipestStays } from '../src/bestAndChipestHotels.js'
const isTravelForm = window.location.pathname.includes('form-catalonia')
let swup;
if (!isTravelForm) {
    swup = new Swup();
}

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


const createTravelEvent = () => {
    const btnTravel = document.querySelector('#btnTravel');
    btnTravel?.addEventListener('click', createTravel)
}

const removeTravelEvent = () => {
    const btnTravel = document.querySelector('#btnTravel');
    btnTravel?.addEventListener('click', createTravel);
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
    
    if (!isTravelForm) {
        showCityData();
        showSites();
        getCityId();
        getBestAndChipestStays();
    }
    createTravelEvent();
}

const unmount = () => {
    //removeCommunityEvents();
    removeButtonEvents();
    removeTravelEvent();
}


mount();

swup?.on('willReplaceContent', unmount);

swup?.on('contentReplaced', mount);
