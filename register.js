const form = document.querySelector('form');

form.addEventListener('submit', register);

function register(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('input');
    const url = 'https://mapped-backend-kdjbm.ondigitalocean.app/api/users/create.php';
    const raw = JSON.stringify({
        "name": `${inputs.item(0).value} ${inputs.item(1).value}`,
        "email": inputs.item(2).value,
        "password": inputs.item(3).value,
        "phone": inputs.item(4).value
    });

    const myHeaders = new Headers();

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log(inputs);
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}