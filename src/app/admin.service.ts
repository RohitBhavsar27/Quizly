import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private httpclient: HttpClient) { }

    validateAdmin(admin: Admin): Observable<any> {
        return this.httpclient.post<boolean>("http://127.0.0.1:8000/Exam_api/validateAdmin/", admin).pipe(
            catchError(error => {
                return throwError("Invalid Credentials.");
            })
        );;
    }

    getResults(subject: string) {
        return this.httpclient.get<Results[]>("http://127.0.0.1:8000/Exam_api/getResults/" + subject)
    }

    getAllResults() {
        return this.httpclient.get<Results[]>("http://127.0.0.1:8000/Exam_api/getAllResults/")
    }
}

export class Admin {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class Results {
    username: string;
    subject: string;
    score: any;

    constructor(username: string, subject: string, score: any) {
        this.username = username;
        this.subject = subject;
        this.score = score;
    }
}