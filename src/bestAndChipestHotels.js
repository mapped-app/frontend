const communityDictinary = {
    'catalonia': 10,
    'madrid': 11,
    'valencia': 12,
};

const getBestAndChipestStays = async () => {
    const cities = await getCommunityCities()
    if (!!cities) {
        try {
            const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/booked_stays/read.php", {
                method: 'GET',
            });
            let bookedStays = await response.json();
            bookedStays = await bookedStays.body.map(async stay => {

                if (typeof cities === "boolean") {
                    return {
                        'travel_id': stay.travel_id,
                        'stay_id': stay.stay_id,
                        'rate': parseFloat(stay.rate),
                        'cost': parseFloat(stay.cost),
                        'name': await getStayName(stay.stay_id),
                    };
                }
                else {
                    let city = await getStayCity(stay.stay_id);
                    if (cities.includes(city)) {
                        return {
                            'travel_id': stay.travel_id,
                            'stay_id': stay.stay_id,
                            'rate': parseFloat(stay.rate),
                            'cost': parseFloat(stay.cost),
                            'name': await getStayName(stay.stay_id),
                        };
                    }
                }
            });

            bookedStays = Promise.all(bookedStays).then(stays => {
                return stays.filter(a => a)
            });

            bookedStays.then(stays => {
                return stays?.map(stay => {
                    let object = { name: '', rate: 0, cost: 0, cont: 0 };
                    if (!!stay) {
                        stays?.map(st => {
                            if (stay.name === st?.name) {
                                object.rate += st.rate;
                                object.cont++;
                            }
                        })
                        object.name = stay.name;
                        object.cost = stay.cost;
                        object.rate = object.rate / object.cont;
                        return object;
                    }
                    return;
                })
            }).then(stays => {
                let unicStays = stays.reduce((allStays, stay) => {
                    const x = allStays.find(item => item.name === stay.name);
                    if (!x) {
                        return allStays.concat([stay]);
                    } else {
                        return allStays;
                    }
                }, []);

                const staysByRate = unicStays.sort((g, z) => z.rate - g.rate);
                const staysByCost = unicStays.slice().sort((g, z) => g.cost - z.cost);
                const containerRate = document.querySelector('.data.stays');
                const listRate = document.createElement('ol');

                staysByRate.slice(0, 8).forEach(stay => {
                    const li = document.createElement('li');
                    const div = document.createElement('div');
                    div.classList.add('div-list');
                    const span1 = document.createElement('span');
                    const span2 = document.createElement('span');

                    span1.innerHTML = stay.name;
                    span2.innerHTML = stay.rate + "/5";

                    div.appendChild(span1);
                    div.appendChild(span2);
                    li.appendChild(div);
                    listRate.appendChild(li);
                });

                listRate.style.display = 'block';
                containerRate.append(listRate);

                const containerCost = document.querySelector('.data.rate');
                const listCost = document.createElement('ol');

                staysByCost.slice(0, 8).forEach(stay => {
                    const li = document.createElement('li');
                    const div = document.createElement('div');
                    div.classList.add('div-list');
                    const span1 = document.createElement('span');
                    const span2 = document.createElement('span');

                    span1.innerHTML = stay.name;
                    span2.innerHTML = stay.cost + "???";

                    div.appendChild(span1);
                    div.appendChild(span2);
                    li.appendChild(div);
                    listCost.appendChild(li);
                });

                listCost.style.display = 'block';
                containerCost.append(listCost);
            });
        } catch (error) {
            return
        }
    }
}

async function getStayName(idStay) {
    try {
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/stays/read_by_id.php?stay_id=" + idStay, {
            method: 'GET',

        });

        const stays = await response.json();

        return stays.name;
    } catch (error) {
        return
    }
}


async function getStayCity(idStay) {
    try {
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/stays/read_by_id.php?stay_id=" + idStay, {
            method: 'GET',

        });

        const stays = await response.json();

        return parseInt(stays.city_id);
    } catch (error) {
        return
    }
}

async function getCommunityCities() {
    if (window.mapped.state === "country") {
        return true;
    }
    else {
        const communityId = communityDictinary[window.mapped.location];
        try {
            const responseProvince = fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/provinces/read_by_community_id.php?community_id=" + communityId, {
                method: 'GET',

            });

            const provinces = await (await responseProvince).json();
            const citiesID = [];

            !!provinces?.body && await provinces.body.map(async function (province) {
                const responseCities = fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/cities/read_by_province_id.php?province_id=" + province.province_id, {
                    method: 'GET',

                });

                const data = await (await responseCities).json();

                !!data?.body && await data?.body.map(async function (city) {
                    const temp = await city;

                    citiesID.push(parseInt(temp.city_id));
                });

            });

            return citiesID;
        } catch (error) {
            return
        }
    }
}

export { getBestAndChipestStays };
