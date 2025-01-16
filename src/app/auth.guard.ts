import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const username = sessionStorage.getItem('username'); // Check if the user is logged in
        if (username) {
            return true;
        } else {
            // If not authenticated, redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
    }
}
