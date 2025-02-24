import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../question.service';
import { Admin, AdminService } from '../admin.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    user: User = new User('', '', '', '', '');
    admin: Admin = new Admin('', '');
    subjects: string[] = []
    myLoginForm!: FormGroup;

    constructor(
        private userService: UserService,
        private questionService: QuestionService,
        private router: Router,
        private adminService: AdminService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.questionService.getAllSubjects().subscribe(
            response => {
                if (Array.isArray(response)) {
                    this.subjects = response;
                } else {
                    console.error("Unexpected response format:", response);
                    this.subjects = [];
                }
            },
            error => {
                console.error("Error fetching subjects:", error);
                this.subjects = [];
            }
        );

        this.myLoginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            subject: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.myLoginForm.valid) {
            console.log('Form Submitted!', this.myLoginForm.value);
            this.validateUser();
        } else {
            alert("Please fill in all required fields.");
        }
    }


    validateUser() {
        const loginData = this.myLoginForm.value;

        this.userService.validateUser(loginData).subscribe(
            response => {
                if (response.success) {
                    sessionStorage.setItem('username', loginData.username);
                    sessionStorage.setItem('subject', loginData.subject);
                    alert("Login successful.");
                    this.router.navigateByUrl('question');
                } else {
                    alert(response.error || "Invalid Credentials");
                    sessionStorage.clear();
                    this.router.navigateByUrl('login');
                }
            },
            error => {
                alert("Invalid Credentials");
                sessionStorage.clear();
                this.router.navigateByUrl('login');
            }
        );
    }
}