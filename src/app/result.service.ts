import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResultService {

    constructor(private httpClient: HttpClient) {

    }
    saveResults(result: Results) {
        console.log("Sending Data:", result);  // ✅ Debugging
        return this.httpClient.post<boolean>("https://online-exam-client.vercel.app/Exam_api/saveResults/", result);
    }

}

export class Results {
    username: string;
    subject: string;
    score: number;

    constructor(username: string, subject: string, score: number) {
        this.username = username;
        this.subject = subject;
        this.score = score
    }
}
