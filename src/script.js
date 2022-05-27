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