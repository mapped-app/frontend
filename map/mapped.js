class Mapped {
    #user;
    #state;
    #location;
    constructor() {
        try {
            const userName = sessionStorage.getItem('name');
            const id = sessionStorage.getItem('id');
            const token = sessionStorage.getItem('token');
            const email = sessionStorage.getItem('email');
            this.#user = {
                name: userName || '',
                id: id || '',
                token: token || '',
                email: email || '',
            }
            this.#state = 'country';
            this.#location = 'spain';
        } catch (error) {
            console.log(error);
        }
    }

    get user(){
        return this.#user;
    }

    get userId() {
        return this.user.id;
    }

    get userName() {
        return this.user.name;
    }

    get userToken() {
        return this.user.token;
    }

    get userEmail() {
        return this.user.email;
    }

    set state(state) {
        this.#state = state;
        if (this.#state === 'country') {
            this.location = 'spain';
        }
    }

    get state() {
        return this.#state;
    }

    set location(location) {
        this.#location = location;
        if (this.#location === 'spain') {
            this.state = 'country';
        }
    }

    get location() {
        return this.#location;
    }
}

export { Mapped };