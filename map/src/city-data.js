function showCityData() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const container = document.querySelector('.destiny');
    const fragment = document.createDocumentFragment();

    fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/travels/read.php", requestOptions)
        .then(response => response.json())
        .then(data => {
            const result = {};
            data.body.forEach((travel) => {
                const currentCity = travel.city_id;
                result[currentCity] ??= 0;
                result[currentCity] += 1;
            })
            const cityRanking = Object.entries(result).sort((a,b) => b[1] - a[1]);
            console.log(cityRanking);
            return cityRanking;
        }).then(data => {
            data.forEach(id => {
                fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/cities/read_by_id.php?city_id=${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    const itemList = document.createElement('li');
                    itemList.textContent = result.name;
                    fragment.appendChild(itemList);
                    console.log(fragment);
                })
                .catch(error => console.log('error', error));
            })
        }).then(() => {
            console.log(fragment);
            container.appendChild(fragment);
        })
        .catch(error => console.log('error', error));
}

export { showCityData };