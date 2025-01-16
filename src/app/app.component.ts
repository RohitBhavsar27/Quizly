import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'onlineExam_client';
    constructor(private router:Router){}

    logout() {
        const isUserLoggedIn = sessionStorage.getItem('username'); // Check if a user is logged in
        const isAdminLoggedIn = sessionStorage.getItem('adminUsername'); // Check if an admin is logged in

        if (isUserLoggedIn) {
            // Clear user-specific session data
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('role'); // Optional: Remove role information
            this.router.navigate(['/login']); // Redirect to user login
            console.log('User logged out');
        } else if (isAdminLoggedIn) {
            // Clear admin-specific session data
            sessionStorage.removeItem('adminUsername');
            sessionStorage.removeItem('role'); // Optional: Remove role information
            this.router.navigate(['/adminLogin']); // Redirect to admin login
            console.log('Admin logged out');
        } else {
            console.log('No active session found');
            this.router.navigate(['/login']); // Default fallback
        }
    }

}
