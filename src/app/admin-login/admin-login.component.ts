import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin, AdminService } from '../admin.service';
import { User } from '../user.service';

@Component({
    selector: 'app-admin-login',
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

    user: User = new User('', '', '', '', '');
    admin: Admin = new Admin('', '');
    myAdminLoginForm!: FormGroup;


    constructor(private router: Router, private adminService: AdminService, private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.myAdminLoginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })
    }

    onSubmit() {
        if (this.myAdminLoginForm.valid) {
            console.log('Form Submitted!', this.myAdminLoginForm.value);
        }
    }


    validateAdmin() {
        this.admin.username = this.user.username;
        this.admin.password = this.user.password;

        this.adminService.validateAdmin(this.user).subscribe(
            response => {
                if (response.success) {
                    sessionStorage.setItem('adminUsername', this.admin.username); // Store admin session
                    alert("Login successful., Redirecting to admin dashboard.");
                    this.router.navigateByUrl('adminDashboard'); // Redirect to protected route
                } else {
                    alert(response.error || "Invalid Credentials");
                    sessionStorage.clear(); // Clear any existing session data
                    this.router.navigateByUrl('adminLogin');
                }
            },
            error => {
                alert("Invalid Credentials");
                sessionStorage.clear(); // Clear any existing session data
                this.router.navigateByUrl('adminLogin');
            }
        );
    }


}
