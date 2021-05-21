class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        setTimeout(cb, 100)
    }

    logout(cb) {
        this.authenticated = false;
        setTimeout(cb, 100)
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
