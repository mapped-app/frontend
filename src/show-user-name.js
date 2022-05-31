const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function showUserName() {
    const userId =  window.mapped.userId;
    fetch(`https://mapped-backend-kdjbm.ondigitalocean.app/api/users/read_by_id.php?user_id=${userId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.name);
                document.querySelector('#user_name').outerHTML= data.name ;
            })
}
export{showUserName};