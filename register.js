const form = document.querySelector('form');
let userData = null;  // For saving all user data returned from the api

form.addEventListener('submit', register);

function register(event) {
    event.preventDefault();
    const error = document.querySelector('#error');
    const inputs = document.querySelectorAll('input');
    const url = 'https://mapped-backend-kdjbm.ondigitalocean.app/api/users/create.php';
    const raw = {
        "name": `${inputs.item(0).value} ${inputs.item(1).value}`,
        "email": inputs.item(2).value,
        "password": inputs.item(3).value,
        "phone": inputs.item(5).value
    };
    if (!validName(raw.name)) {
        error.innerHTML = "<span style='color: red;'>El nombre no es valido</span>";
        return;
    }
    if (!validPassword(inputs.item(3).value, inputs.item(4).value)) {
        error.innerHTML = "<span style='color: red;'>Las contraseñas no son identicas</span>";
        return;
    }
    callApi(url, raw);

}

function callApi(url, data) {
    const myHeaders = new Headers();
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            isUserCreated(result);
        })
        .catch(error => console.log('error', error));
}

function formatName(name) {
    name = name.trim().split(' ').filter(value => {
        return value;
    });
    name = name.map(value => {
        return value[0].toUpperCase() + value.slice(1, value.length).toLowerCase();
    });
    name = name.join(' ');
    return name;
}

function validName(name) {
    const exp = /^([A-Za-z]\s*){3,}$/ig;
    name = formatName(name);
    return exp.test(name);
}

function validPassword(password, passwordConfirm) {
    return password === passwordConfirm;
}

function isUserCreated(result) {
    if (result.status === 'success') {
        userData = {
            'user_id': result.user_id,
            'token': result.token,
            'name': result.name,
            'email': result.email,
            'phone': result.phone
        }
        console.log(userData);
        return location.pathname = '/map/community.html';
    }
    error.innerHTML = "<span style='color: red;'>El correo electronico ya existe, prueba otro</span>";
}