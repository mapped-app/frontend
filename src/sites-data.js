const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const communityDictinary = {
    'catalonia': 10,
    'madrid': 30,
    'valencia': 32,
}

function getVisitedSites() {
    return new Promise((resolve, reject) => {
        fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/sites_visited/read.php`, requestOptions)
            .then(response => response.json())
            .then(data => {
                resolve(data?.body?.map(site => site.site_id))
            })
    })
}


function countVisitedSites(visitedSitesArr) {
    return new Promise((resolve, reject) => {
        let counts = {};
                visitedSitesArr.forEach((el) => {
                    counts[el] = counts[el] ? (counts[el] += 1) : 1;
                });
                const countsSorted = Object.entries(counts).sort(([_, a], [__, b]) => b - a);
                resolve(countsSorted);
    })
}

function printSitesData(sitesArr) {
    const container = document.querySelector('.sites');  
    const list =  document.createElement('ol');
    let name; 
    let comunity = communityDictinary[window.mapped.location];
    const result = sitesArr.map(async el => {
                    let id = el[0];
                    const sitesData= await fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/sites/read_by_id.php?site_id=${id}`,requestOptions)
                    const parsedSites = await sitesData.json();                    
                    return parsedSites
                    ;})
                    Promise.all(result).then(data => {
                    // print with and without comunity filter (comunity)
                    !!comunity ? data.filter(item => item.city_id == comunity).forEach((el,index) => {
                        console.log(comunity);
                        console.log(el);
                        let count = sitesArr[index][1];
                        name = el.name;
                        let itemList = document.createElement('li');
                        let div = document.createElement('div');
                        div.classList.add("div-list");
                        let span1 = document.createElement('span');
                        let span2 = document.createElement('span');
                        span1.textContent = name;
                        span2.textContent = count;
                        div.appendChild(span1);
                        div.appendChild(span2);
                        itemList.appendChild(div);
                        list.appendChild(itemList);
                        container.appendChild(list);
                        }): data.forEach((el,index) => {
                            let count = sitesArr[index][1];
                            name = el.name;
                            let itemList = document.createElement('li');
                        let div = document.createElement('div');
                        div.classList.add("div-list");
                        let span1 = document.createElement('span');
                        let span2 = document.createElement('span');
                        span1.textContent = name;
                        span2.textContent = count;
                        div.appendChild(span1);
                        div.appendChild(span2);
                        itemList.appendChild(div);
                        list.appendChild(itemList);
                        container.appendChild(list);
                            });
                    })
}

function showSites(){
    getVisitedSites()
    .then(sitesIds => countVisitedSites(sitesIds))
    .then(sitesArr => printSitesData(sitesArr))
}

export{showSites};
