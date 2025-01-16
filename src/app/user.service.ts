import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpclient: HttpClient) {

    }

    validateUser(user: User) {
        return this.httpclient.post<boolean>("http://127.0.0.1:8000/Exam_api/validateUser/",user);
    }

    signUp(user: User) {
        return this.httpclient.post<boolean>("http://127.0.0.1:8000/Exam_api/signUp/",user);
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
