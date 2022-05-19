import * as province from './assets/svg_codes.js';

const communitiesEl = document.querySelector('#communities_container');
const provinceEl = document.querySelector('#province_container');

const openCommunity = (event) => {
    if (event.target.tagName === 'path') {
        communitiesEl.className = "d-none";
        const idRegExp = new RegExp(event.target.id, 'i');
        const findedProvince = Object.values(province).find((svg) => { 
            return idRegExp.test(svg);
        })
        provinceEl.innerHTML = findedProvince;
        provinceEl.removeAttribute("class");
    }
}

communitiesEl.addEventListener('click', openCommunity);




