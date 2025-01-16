import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin, AdminService } from '../admin.service';
import { User } from '../user.service';

@Component({
    selector: 'app-admin-login',
    imports: [FormsModule, CommonModule],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

    user: User = new User('', '', '', '', '');
    admin: Admin = new Admin('', '');

    message: string = "Invalid Credentials"

    constructor(private router: Router, private adminService: AdminService) {

    }

    validateAdmin() {
        this.admin.username = this.user.username;
        this.admin.password = this.user.password;

        this.adminService.validateAdmin(this.admin).subscribe((ans) => {
            if (ans) {
                sessionStorage.setItem('adminUsername', this.admin.username); // Store admin session
                alert('Login Successful, redirecting to admin dashboard');
                this.router.navigate(['adminDashboard']); // Redirect to protected route
            } else {
                alert(this.message);
                sessionStorage.clear(); // Clear session data if login fails
                this.router.navigate(['adminLogin']);
            }
        });
    }


}
