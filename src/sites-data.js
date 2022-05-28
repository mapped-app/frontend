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
  let counts = {};
  await getVisitedSites()
  .then(visitedSitesArr => {
        visitedSitesArr.forEach((el) => {
        counts[el] = counts[el] ? (counts[el] += 1) : 1;
      });
      const countsSorted = Object.entries(counts).sort(([_, a], [__, b]) => b - a);
  console.log(countsSorted);
    })
}

//getVisitedSites();
countVisitedSites();
