import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {
    }

    getUserDetails(): any {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    }

    setDataInLocalStorage(variableName, data): void {
        localStorage.setItem(variableName, data);
    }

    getToken(): any {
        return localStorage.getItem('token');
    }

    clearStorage(): void {
        localStorage.clear();
    }
}
