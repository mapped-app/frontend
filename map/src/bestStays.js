const myHeaders = new Headers();
const getBestStays = async () => {
    try {
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/booked_stays/read.php", {
            method: 'GET',
            headers: myHeaders,
        });
        let bookedStays = await response.json();
        bookedStays = await bookedStays.body.map(async stay => {
            let name
            getStayName(stay.stay_id, name)
            return {
                'travel_id': stay.travel_id,
                'stay_id': stay.stay_id,
                'rate': parseFloat(stay.rate),
                'cost': parseFloat(stay.cost),
                'name': await getStayName(stay.stay_id),
            }
        });

        const bestStays = Promise.all(bookedStays).then(stays => {
            return stays.sort((a, b) => {
                return a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim())
            })
        });

        bestStays.then(a => {
            return a.map(stay => {
                let object = { name: '', rate: 0, cost: 0, cont: 0 };
                a.map(st => {
                    if (stay.name === st.name) {
                        object.rate += st.rate;
                        object.cont++;
                    }
                })
                object.name = stay.name;
                object.cost = stay.cost;
                object.rate = object.rate / object.cont;
                console.log(object);
                return object
            })
        }).then(b => {
            let filteredArr = b.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            filteredArr = filteredArr.sort((g, z) => z.rate - g.rate);
            filteredArrCost = filteredArr.slice().sort((g, z) => g.cost - z.cost);

            console.log(filteredArr)
            const container = document.querySelector('.data.stays');
            const list = document.createElement('ul');
            filteredArr.slice(0, 8).forEach(stay => {
                const li = document.createElement('li');
                li.textContent = `${stay.name.trim()} - ${stay.rate}/5`;
                list.append(li);
            })
            list.style.display = 'block';
            container.append(list);
            const containerCost = document.querySelector('.data.rate');
            const listCost = document.createElement('ul');
            filteredArrCost.slice(0, 8).forEach(cost => {
                const li = document.createElement('li');
                li.textContent = `${cost.name.trim()} - ${cost.cost}€`;
                listCost.append(li);
            })
            listCost.style.display = 'block';
            containerCost.append(listCost);
        });
    } catch (error) {
        console.log(error);
    }
}

async function getStayName(id) {
    try {
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/stays/read_by_id.php?stay_id=" + id, {
            method: 'GET',
            headers: myHeaders,
        });
        let stays = await response.json();
        return stays.name;
    } catch (error) {
        console.log(error);
    }
}


getBestStays();


