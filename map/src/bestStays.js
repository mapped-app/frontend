const myHeaders = new Headers();
const getBestStays = async () => {
    try {
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/booked_stays/read.php", {
            method: 'GET',
            headers: myHeaders,
        });
        let bookedStays = await response.json();
        bookedStays = bookedStays.body.map(stay => {
            let name
            getStayName(stay.stay_id, name)
            return {
                'travel_id': stay.travel_id,
                'stay_id': stay.stay_id,
                'rate': parseFloat(stay.rate),
                'cost': parseFloat(stay.cost),
                'name': getStayName(stay.stay_id).value
            }
        });
        //console.log(bookedStays);
        const bestStays = bookedStays.sort((a, b) => {
            return b.rate - a.rate || a.cost - b.cost
        });
        console.log(bestStays);
        showBestStays(bestStays);
    } catch (error) {
        console.log(error);
    }
}

function showBestStays(stays) {
    const container = document.querySelector('.data.stays');
    console.log(container);
    const list = document.createElement('ul');
    stays.forEach(stay => {
        const li = document.createElement('li');
        li.textContent = `${stay.name} - ${stay.rate}/5`;
        list.append(li);
        console.log(li);
    });
    console.log(list);
    container.append(list);
    console.log(container);
}



getBestStays();

async function getStayName(id) {
    try {
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/stays/read_by_id.php?stay_id=" + id, {
            method: 'GET',
            headers: myHeaders,
        });
        let stays = await response.json();
        //console.log(stays);
        return stays.name;
    } catch (error) {
        console.log(error);
    }
}

//getStayName(37);