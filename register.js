const form = document.querySelector('form');

form.addEventListener('submit', register);

function register(event) {
    event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "name": "Hasan",
          "email": "hasan@merce.com",
          "password": "pass123",
          "phone": "666666666"
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://mapped-backend-kdjbm.ondigitalocean.app/api/users/create.php", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

}