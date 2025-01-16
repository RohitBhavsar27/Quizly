import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    user: User = new User('', '', '', '', '');
    message: string = ""

    constructor(private userService: UserService, private router: Router) {

    }

    signUp() {
        this.userService.signUp(this.user).subscribe(response => {
            if (response) {
                alert("Registration successful, redirecting to login page")
                this.router.navigateByUrl('')
            } else {
                this.message = "all fileds are compulsory"
                this.router.navigateByUrl("register")
            }
        })
    }
}
