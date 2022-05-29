function createTravel() {
    const dates = document.querySelectorAll('input[type=date]');
    const startDate = dates && dates[0]?.value;
    const endDate = dates && dates[1]?.value;
    const cityOrigin = document.querySelector('input[name=cityOrigin]')?.value;
    const transport = document.querySelector('input[name=transportType]')?.value;
    const transportCost = document.querySelector('input[name=transportCost]')?.value;
    const transportTime = document.querySelector('input[name=transportTime]')?.value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "city_id": "14",
        "user_id": "15",
        "start_date": startDate,
        "end_date": endDate,
        "city_origen": cityOrigin,
        "transport": transport,
        "transport_cost": transportCost,
        "transport_time": transportTime,
        "travel_cost": "89",
        "travel_time": "8"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/travels/create.php", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

showPosition();

export { createTravel };

/* ------------------ */

//cords = {lat: '', lng : ''} ;
var a = '';
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}
else { x.innerHTML = "Geolocation is not supported by this browser."; }
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const url = new URL('https://api.geocodify.com/v2/reverse');
    const params = { api_key: 'afdb4c0adff53b580d8ab2b7177f6ed1dd1e8761', lat: lat, lng: lon };

    url.search = new URLSearchParams(params).toString();
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(response.response.features[0].properties.country);
            console.log(response.response.features[0].properties.macroregion);
            console.log(response.response.features[0].properties.region);
            console.log(response.response.features[0].properties.label);
        })
        .catch(err => console.log(err));
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}