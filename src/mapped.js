class Mapped {
    constructor() {
        try {
            const rawPlace = window.location.pathname.replace(/\/|frontend|map|\.html/g, '');
            const place = (/community/).test(rawPlace) ? 'spain' : rawPlace;
            const state = place === 'spain' ? 'country' : 'province';
            sessionStorage.setItem('state', state);
            sessionStorage.setItem('location', place);
        } catch (error) {
            console.log(error);
        }
    }

    get userId() {
        return window.sessionStorage.id;
    }

    get userName() {
        return window.sessionStorage.name;
    }

    get userToken() {
        return window.sessionStorage.token;
    }

    get userEmail() {
        return window.sessionStorage.email;
    }

    get state() {
        return window.sessionStorage.state;
    }

    get location() {
        return window.sessionStorage.location;
    }

    checkLocation() {
        const rawPlace = window.location.pathname.replace(/\/map\/|\.html/g, '');
        if (rawPlace === this.location) {
            return;
        }
        const place = (/community/).test(rawPlace) ? 'spain' : rawPlace;
        const state = place === 'spain' ? 'country' : 'province';
        sessionStorage.setItem('state', state);
        sessionStorage.setItem('location', place);
    }
}

export { Mapped };