const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function getVisitedSites() {
    return new Promise((resolve, reject) => {
        fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/sites_visited/read.php`, requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                resolve(data?.body?.map(site => site.site_id))
            })
    })
}


async function countVisitedSites() {
    return new Promise((resolve, reject) => {
        let counts = {};
         getVisitedSites()
            .then(visitedSitesArr => {
                visitedSitesArr.forEach((el) => {
                    counts[el] = counts[el] ? (counts[el] += 1) : 1;
                });
                //console.log(counts);
                const countsSorted = Object.entries(counts).sort(([_, a], [__, b]) => b - a);
                console.log(countsSorted);
                resolve(countsSorted);
            })
    })
}

/*async function getSiteNameById() {
    return new Promise((resolve, reject) => {
        let sitesName = [];
        countVisitedSites()
            .then(siteArr => {
                siteArr.forEach(el => {
                    let cont = 2;
                    let name;
                    let id = el[0];
                    let count = el[1];
                     fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/sites/read_by_id.php?site_id=${id}`,requestOptions)
                    .then(response => response.json())
                    .then(sites => {
                    name = Promise.all(sites.name);
                    sitesName.push(name+' '+count);
                    //sitesName[0]=111111;
                    //console.log(sites.name +' '+count );
                });
                });
            })
            //console.log(sitesName);
            resolve(sitesName)
    })
}*/

// test
async function getSiteNameById() {
        let sitesName = [];
        const container = document.querySelector('.sites');
        countVisitedSites()
            .then(siteArr => {
                siteArr.forEach(el => {
                    let cont = 2;
                    let name;
                    let id = el[0];
                    let count = el[1];
                     fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/sites/read_by_id.php?site_id=${id}`,requestOptions)
                    .then(response => response.json())
                    .then(sites => {
                    name = sites.name;
                    sitesName.push(name+' '+count);
                    const itemList = document.createElement('li');
                    itemList.textContent = name+' - '+count;
                    container.appendChild(itemList);
                });
                
                });
            })
            console.log(sitesName);
}






function showSites(){
    getSiteNameById()
    .then(site => console.log(site))

}

//getVisitedSites();
//countVisitedSites();
//getSiteNameById();
showSites();