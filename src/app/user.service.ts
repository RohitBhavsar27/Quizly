import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpclient: HttpClient) {

    }

    validateUser(user: User): Observable<any> {
        return this.httpclient.post<boolean>("https://quizly-backend-psi.vercel.app/Exam_api/validateUser/", user).pipe(
            catchError(error => {
                return throwError("Invalid Credentials.");
            })
        );;
    }

    signUp(user: User) {
        return this.httpclient.post<boolean>("https://quizly-backend-psi.vercel.app/Exam_api/signUp/", user);
    }
}

export class User {
    fname: string;
    lname: string;
    emailId: string;
    username: string;
    password: string;

    constructor(fname: string, lname: string, emailId: string, username: string, password: string) {
        this.fname = fname
        this.lname = lname
        this.emailId = emailId
        this.username = username
        this.password = password
    }

}
