

const url = new URL('https://api.geocodify.com/v2/reverse');

const params = { api_key: 'afdb4c0adff53b580d8ab2b7177f6ed1dd1e8761', lat: 40.858745, lng: -5.685097 };

url.search = new URLSearchParams(params).toString();

fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        console.log(response.response.features[0].properties.country);
        console.log(response.response.features[0].properties.macroregion);
        console.log(response.response.features[0].properties.region);
        console.log(response.response.features[0].properties.label);
    })
    .catch(err => console.error(err));