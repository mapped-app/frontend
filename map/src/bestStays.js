const getBestStays = async () => {
    try {
        const myHeaders = new Headers();
        const response = await fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/booked_stays/read.php", {
            method: 'GET',
            headers: myHeaders,
        });
        let bookedStays = await response.json();
        bookedStays = bookedStays.body.map(stay => {
            return {
                'travel_id': stay.travel_id,
                'stay_id': stay.stay_id,
                'rate': parseFloat(stay.rate),
                'cost': parseFloat(stay.cost)
            }
        });
        //console.log(bookedStays);
        const bestStays = bookedStays.sort((a, b) => {
            return b.rate - a.rate || a.cost - b.cost
        });
        console.log(bestStays);
    } catch (error) {
        console.log(error);
    }
}

getBestStays();