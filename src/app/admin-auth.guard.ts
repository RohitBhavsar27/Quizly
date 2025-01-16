import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class adminAuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const adminUsername = sessionStorage.getItem('adminUsername'); // Check if admin is logged in
        if (adminUsername) {
            return true;
        } else {
            // Redirect to admin login page if not authenticated
            this.router.navigate(['/adminLogin']);
            return false;
        }
    }
}
