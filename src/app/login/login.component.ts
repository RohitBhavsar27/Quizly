import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../question.service';
import { Admin, AdminService } from '../admin.service';

@Component({
    selector: 'app-login',
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    user: User = new User('', '', '', '', '');
    admin: Admin = new Admin('', '');

    message: string = ""
    subjects: string[] = []
    subject: string = ""

    constructor(private userService: UserService, private questionService: QuestionService, private router: Router, private adminService: AdminService) {

    }


    ngOnInit(): void {
        this.questionService.getAllSubjects().subscribe(
            array => this.subjects = array
        )
    }

    validateUser() {
        this.userService.validateUser(this.user).subscribe(response => {
            if (response) {
                sessionStorage.setItem('message', 'welcome ' + this.user.username);
                sessionStorage.setItem('username', this.user.username);
                sessionStorage.setItem('subject', this.subject);
                this.router.navigateByUrl('question'); // Redirect to protected route
            } else {
                this.message = 'Invalid credentials';
                sessionStorage.clear(); // Clear any existing session data
                this.router.navigateByUrl('login');
            }
        });
    }


    validateAdmin() {
        this.admin.username = this.user.username
        this.admin.password = this.user.password

        this.adminService.validateAdmin(this.admin).subscribe(ans => {
            if (ans) {
                this.router.navigate(['adminDashboard'])
            } else {
                this.router.navigate(['login'])
                this.message = "invalid credentials"
            }
        })

    }
}
