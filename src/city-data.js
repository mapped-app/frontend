const requestOptions = {
    method: 'GET', redirect: 'follow'
};

const communityDictinary = {
    'catalonia': 10, 'madrid': 11, 'valencia': 12,
}

function getProvincesFromCommunity() {
    return new Promise((resolve, reject) => {
        const communityId = communityDictinary[window.mapped.location];
        fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/provinces/read_by_community_id.php?community_id=${communityId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resolve(data?.body?.map(province => province.province_id))
            })
    })
}

function getCitiesFromProvinces(provincesArr) {
    return new Promise((resolve, reject) => {
        if (!provincesArr) {
            resolve();
        }
        const result = [];
        const cityResult = provincesArr.map(async province => {
            const cities = await fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/cities/read_by_province_id.php?province_id=${province}`, requestOptions)
            const parsedCities = await cities.json();

            return parsedCities;
        })
        Promise.all(cityResult).then(data => {
            data.forEach((cityArr) => {
                cityArr?.body?.forEach(city => result.push(city.city_id))
            })
            resolve(result);
        });
    })
}


function orderCityVisits(citiesArr) {
    return new Promise((resolve, reject) => {
        fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/travels/read.php", requestOptions)
            .then(response => response.json())
            .then(data => {
                const result = {};
                data.body.forEach((travel) => {
                    if (citiesArr && citiesArr.includes(travel.city_id)) {
                        const currentCity = travel.city_id;
                        result[currentCity] ??= 0;
                        result[currentCity] += 1;
                    } else if (!citiesArr) {
                        const currentCity = travel.city_id;
                        result[currentCity] ??= 0;
                        result[currentCity] += 1;
                    }
                })
                const cityRanking = Object.entries(result).sort((a, b) => b[1] - a[1]);
                resolve(cityRanking);
            })
    })
}

function showCityData() {
    getProvincesFromCommunity()
        .then(provincesArr => getCitiesFromProvinces(provincesArr))
        .then(citiesArr => orderCityVisits(citiesArr))
        .then(cityArray => {
            const container = document.querySelector('.destiny');
            const list = document.createElement('ol');
            const fragment = document.createDocumentFragment();
            const cityResult = cityArray.map(async cityData => {
                const cities = await fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/cities/read_by_id.php?city_id=${cityData[0]}`, requestOptions)
                const parsedCities = await cities.json();

                return parsedCities;
            })
            Promise.all(cityResult).then(data => {
                data.forEach((city, index) => {
                    let count = cityArray[index][1];
                    name = city.name;
                    let itemList = document.createElement('li');
                    let div = document.createElement('div');
                    div.classList.add("div-list");
                    let span1 = document.createElement('span');
                    let span2 = document.createElement('span');
                    span1.textContent = name;
                    span2.textContent = count;

                    // ???? EYE ICON
                    let eye = document.createElement('i');
                    eye.classList.add("fa-solid", "fa-eye");
                    span2.appendChild(eye);

                    div.appendChild(span1);
                    div.appendChild(span2);
                    itemList.appendChild(div);
                    list.appendChild(itemList);
                    container.appendChild(list);
                })
                container.appendChild(fragment);
            });
        })
}

export {showCityData};
