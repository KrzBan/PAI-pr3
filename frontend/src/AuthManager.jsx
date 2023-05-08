import jwt from 'jsonwebtoken'
import api from './Auth'

const tokenKey = "userToken";

class AuthenticationManager {

    _token;
    _user = null;
    _userChangeReg = [];

    tokenUpdated(newToken) {
        this._token = newToken;
    }

    constructor() {
        var token = window.localStorage.getItem(tokenKey);
        if (token) {
            token = JSON.parse(window.localStorage.getItem(tokenKey));
        }
        this._processToken(token);
        window.addEventListener('storage', (event) => {
            if (event.key === tokenKey) {
                var newToken = event.newValue;
                if (newToken) {
                    newToken = JSON.parse(newToken);
                }

                this._processToken(newToken);
                this.tokenUpdated(newToken);
            }
        }, false);

        setInterval(
            () => this.checkTokenExpiry()
            , 60000
        );
    }

    checkTokenExpiry() {
        if (this._user != null) {
            let expired = this._user.exp < (Date.now() - 1000 * 60 * 5) / 1000;
            if (expired) {
                api.refresh(this.getRefreshToken())
                    .then(
                        (newToken) => {  this.updateToken(newToken) }
                    )
                    .catch(() => {
                        this.updateToken(null);
                        window.location.href = "/login";
                    });
            }
        }
        return Promise.resolve();
    }

    _processToken(token) {
        if (!token) {
            return;
        }
        this._token = token;
        this._user = null;
        try {
            this._user = jwt.decode(token);
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    updateToken(token) {
        this._token = token;
        this._processToken(token);
        if (token) {
            window.localStorage.setItem(tokenKey, JSON.stringify(token));
        }
        else {
            window.localStorage.removeItem(tokenKey);
        }
    }

    getAccessToken() {
        let result = window.localStorage.getItem(tokenKey);
        if (!result) {
            return "";
        }
        return JSON.parse(result).accessToken;
    }

    getRefreshToken() {
        let result = window.localStorage.getItem(tokenKey);
        if (!result) {
            return "";
        }
        return JSON.parse(result).refreshToken;
    }

    logout() {
        this.updateToken(null);
    }
}

export default AuthenticationManager;