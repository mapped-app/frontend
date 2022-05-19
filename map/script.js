const swup = new Swup();

const communitiesEl = document.querySelector('#communities_container');
//const backBtn = document.querySelector('button#back');

const openCommunity = (event) => {
    if (event.target.tagName === 'path') {
        const links = [...document.querySelectorAll('nav a')];
        links.find(link => link.id === event.target.id)?.click();
    } else if (event.target.tagName === 'BUTTON') {
        document.querySelector('a#ES').click();
    }
}

document.body.addEventListener('click', openCommunity);



