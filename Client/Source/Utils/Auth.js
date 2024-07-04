// Package Used To Decode Token And Get User's Information Back
import decode from 'jwt-decode';

// Create New Class To Instantiate For A User
class AuthService {
    // Retrieve User Token From localStorage
    GetToken() {
        return localStorage.getItem('id_token');
    }

    // Get User Data
    GetProfile() {
        return decode(this.GetToken());
    }

    // Check If Token Is Expired
    IsTokenExpired(Token) {
        try {
            const Decoded = decode(Token);
            if (Decoded.Expiration < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (Err) {
            return false;
        }
    }

    // Check If User's Logged In
    LoggedIn() {
        // Check If Saved Token Exists And Is Still Valid
        const Token = this.GetToken();
        return !!Token && !this.IsTokenExpired(Token);
    }

    // Save User Token To localStorage
    Login(IdToken) {
        localStorage.setItem('id_token', IdToken);
        window.location.assign('/');
    }

    // Clear User Token From localStorage
    Logout() {
        localStorage.removeItem('id_token');
        // Reload Page And Reset Application State
        window.location.assign('/');
    }
}

export default new AuthService();