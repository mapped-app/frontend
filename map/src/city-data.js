const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const container = document.querySelector('.destiny');
const fragment = document.createDocumentFragment();


function orderCityVisits() {
    return new Promise((resolve, reject) => {
        fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/travels/read.php", requestOptions)
            .then(response => response.json())
            .then(data => {
                const result = {};
                data.body.forEach((travel) => {
                    const currentCity = travel.city_id;
                    result[currentCity] ??= 0;
                    result[currentCity] += 1;
                })
                const cityRanking = Object.entries(result).sort((a, b) => b[1] - a[1]);
                resolve(cityRanking);
            })
    })
}

function showCityData() {
    orderCityVisits()
        .then(cityArray => {
            const cityResult = cityArray.map(async cityData => {
                const cities = await fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/cities/read_by_id.php?city_id=${cityData[0]}`, requestOptions)
                const parsedCities = await cities.json();

                return parsedCities;
            })
            Promise.all(cityResult).then(data => {
                data.forEach((city, index) => {
                    const itemList = document.createElement('li');
                    itemList.textContent = `${city.name} - ${cityArray[index][1]}`;
                    fragment.appendChild(itemList);
                })
                container.appendChild(fragment);
            });
        })
}

export { showCityData };