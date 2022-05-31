let user = sessionStorage.getItem("id");;
let data;
const communitiesId = {
    10: 'ES-CT',
    11: 'ES-MD',
    12: 'ES-VC'
};

const myHeaders = new Headers();
async function getCityId() {
    const response = await fetch(
        'https://mapped-backend-kdjbm.ondigitalocean.app/api/travels/read_by_user_id.php?user_id=' + user,
        {
            method: 'GET',
            headers: myHeaders,
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    data.body.forEach(data => getProvinceId(data.city_id));
}


async function getProvinceId(id) {
    const response = await fetch(
        'https://mapped-backend-kdjbm.ondigitalocean.app/api/cities/read_by_id.php?city_id=' + id,
        {
            method: 'GET',
            headers: myHeaders,
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    getCommunityId(data.province_id);
}

async function getCommunityId(id) {
    const response = await fetch(
        'https://mapped-backend-kdjbm.ondigitalocean.app/api/provinces/read_by_id.php?province_id=' + id,
        {
            method: 'GET',
            headers: myHeaders,
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    markCommunity(data.community_id);
}


function markCommunity(id) {
    const community = document.querySelector(`svg #${communitiesId[id]}`);
    community.style.fill = '#F47458';
}

export {getCityId}

