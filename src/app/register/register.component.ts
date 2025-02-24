import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    user: User = new User('', '', '', '', '');
    myUserRegistrationForm!: FormGroup;


    constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {

    }

    ngOnInit(): void {

        this.myUserRegistrationForm = this.fb.group({
            fname: ['', [Validators.required]],
            lname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        })
    }

    onSubmit() {
        if (this.myUserRegistrationForm.valid) {
            console.log('Form Submitted!', this.myUserRegistrationForm.value);
        }
    }


    signUp() {
        this.userService.signUp(this.user).subscribe(response => {
            if (response) {
                alert("Registration Successfull., Redirecting to user login.")
                this.router.navigateByUrl('login')
            } else {
                alert("Failed to register, An unexpected error occured.")
                this.router.navigateByUrl("register")
            }
        })
    }
}
