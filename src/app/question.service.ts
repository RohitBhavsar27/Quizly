import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private httpClient: HttpClient) {

    }

    getAllQuestions(subject: string) {
        return this.httpClient.get<Questions[]>("http://127.0.0.1:8000/Exam_api/getAllQuestions/" + subject)
    }

    getAllSubjects() {
        return this.httpClient.get<string[]>("http://127.0.0.1:8000/Exam_api/getAllSubjects/")
    }

    addQuestions(questions: Questions) {
        return this.httpClient.post<boolean>("http://localhost:8000/Exam_api/addQuestions", questions);
    }

    updateQuestions(questions: Questions) {
        return this.httpClient.put<boolean>("http://localhost:8000/Exam_api/updateQuestions/", questions);
    }

    viewQuestions(qno: number, subject: string) {
        return this.httpClient.get<Questions>("http://localhost:8000/Exam_api/viewQuestions/" + qno + "/" + subject);
    }

    deleteQuestions(qno: number, subject: string) {
        return this.httpClient.delete<boolean>("http://localhost:8000/Exam_api/deleteQuestions/" + qno + "/" + subject);
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