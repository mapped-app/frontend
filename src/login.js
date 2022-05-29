const form = document.querySelector('form');
form.addEventListener('submit', login);

async function login(event) {
    event.preventDefault();
    const error = document.querySelector('#error');
    const inputs = document.querySelectorAll('input');
    const email = inputs.item(0);
    const password = inputs.item(1);
    const myHeaders = new Headers();
    const response = await fetch(
        `https://mapped-backend-kdjbm.ondigitalocean.app/api/users/read_by_email_password.php?email=${email.value}&password=${password.value}`,
        {
            method: 'GET',
            headers: myHeaders,
        });
    if (!response.ok) {
        error.innerHTML = "<span style='color: red;'>La contraseña o el correo electronico son incorrectos!!</span>";
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    addSessionUser(userData);
    return location.pathname = '/map/community.html';
}

function addSessionUser(userData) {
    try {
        sessionStorage.setItem('id', userData.user_id);
        sessionStorage.setItem('name', userData.name);
        sessionStorage.setItem('token', userData.token);
        sessionStorage.setItem('email', userData.email);
    } catch (error) { console.log(error) }
}