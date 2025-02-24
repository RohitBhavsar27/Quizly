import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private httpClient: HttpClient) {

    }

    getAllQuestions(subject: string) {
        return this.httpClient.get<Questions[]>("https://online-exam-client.vercel.app/Exam_api/getAllQuestions/" + subject)
    }

    getAllSubjects(): Observable<string[]> {
        return this.httpClient.get<string[]>("https://online-exam-client.vercel.app/Exam_api/getAllSubjects/").pipe(
            catchError(error => {
                console.error("Error fetching subjects", error);
                return throwError(() => new Error("Failed to fetch subjects."));
            })
        );
    }



    addQuestions(questions: Questions): Observable<any> {
        return this.httpClient.post<any>("https://online-exam-client.vercel.app/Exam_api/addQuestions/", questions).pipe(
            catchError(error => {
                return throwError("Failed to add question.");
            })
        );
    }

    updateQuestions(questions: Questions): Observable<any> {
        return this.httpClient.put<any>("https://online-exam-client.vercel.app/Exam_api/updateQuestions/", questions).pipe(
            catchError(error => {
                return throwError("Failed to update question.");
            })
        );
    }

    viewQuestions(qno: number, subject: string): Observable<Questions> {
        return this.httpClient.get<Questions>("https://online-exam-client.vercel.app/Exam_api/viewQuestions/" + qno + "/" + subject).pipe(
            catchError(error => {
                return throwError("Question with given data is not available.");
            })
        );
    }

    deleteQuestions(qno: number, subject: string): Observable<any> {
        return this.httpClient.delete<boolean>("https://online-exam-client.vercel.app/Exam_api/deleteQuestions/" + qno + "/" + subject).pipe(
            catchError(error => {
                return throwError("Question with given data is not available.");
            })
        );
    }
}


export class Questions {
    qno: number;
    subject: string;
    qtext: string;
    op1: string;
    op2: string;
    op3: string;
    op4: string;
    answer: string;

    constructor(qno: number, subject: string, qtext: string, op1: string, op2: string, op3: string, op4: string, answer: string) {
        this.qno = qno;
        this.qtext = qtext;
        this.answer = answer;
        this.op1 = op1;
        this.op2 = op2;
        this.op3 = op3;
        this.op4 = op4;
        this.subject = subject;
    }

}
export class Answer {
    qno: number;
    qtext: string;
    submittedAnswer: string;
    correctAnswer: string;

    constructor(qno: number, qtext: string, submittedAnswer: string, correctAnswer: string) {
        this.qno = qno;
        this.qtext = qtext;
        this.submittedAnswer = submittedAnswer;
        this.correctAnswer = correctAnswer;
    }
}