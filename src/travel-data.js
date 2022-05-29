function createTravel(event) {
    event.preventDefault();
    if (!"geolocation" in navigator) {
        return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
    }

    const onGrantedLocation = position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = new URL('https://api.geocodify.com/v2/reverse');
        const params = { api_key: 'afdb4c0adff53b580d8ab2b7177f6ed1dd1e8761', lat: lat, lng: lon };

        url.search = new URLSearchParams(params).toString();
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const community = response.response.features[0].properties.macroregion;
                const province = response.response.features[0].properties.region;
                const city = response.response.features[0].properties.localadmin;
                const accuredDirection = response.response.features[0].properties.label;
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
            })
            .catch(err => reject(err));
    }

    const onLocationError = err => {
        console.log("Error obteniendo ubicación: ", err);
    }

    const requestOptions = {
        enableHighAccuracy: true, // Alta precisión
        maximumAge: 0, // No queremos caché
        timeout: 5000 // Esperar solo 5 segundos
    };
    // Solicitar
    return navigator.geolocation.getCurrentPosition(onGrantedLocation, onLocationError, requestOptions);
};

export { createTravel };
