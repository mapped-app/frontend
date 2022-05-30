if (window.location.pathname.includes('map/redirect.html')) {
    setTimeout(() => {
        window.location.href = 'https://mapped.site/';
    }, 8000);
} else if (!(window.sessionStorage.id
    && window.sessionStorage.name
    && window.sessionStorage.token
    && window.sessionStorage.email)) {
    window.location.pathname = "/map/redirect.html";
}