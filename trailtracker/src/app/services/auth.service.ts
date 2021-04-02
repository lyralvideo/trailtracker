import { Injectable } from '@angular/core'; 
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService { 
    constructor() { 
    } 
 
    getUserDetails() { 
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null; 
    } 
     
    setDataInLocalStorage(variableName, data) { 
        localStorage.setItem(variableName, data); 
    } 
 
    getToken() { 
        return localStorage.getItem('token'); 
    } 

    loggedIn() {
        if (localStorage.getItem('token') == null) {
            return false;
        } else { 
        return true;
        }
    }

    loggedOut() {
        if (localStorage.getItem('token') == null) {
            return true;
        } else { 
        return false;
        }
    }
 
    clearStorage() { 
        localStorage.clear(); 
    } 

}