import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../question.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-result',
    imports: [FormsModule, CommonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
    score: any = 0
    allanswer: any = [];
    data: any = ''
    username = sessionStorage.getItem('username'); // Check if a user is logged in


    constructor(private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {

        this.activatedRoute.queryParamMap.subscribe(queryparameters => {
            this.score = queryparameters.get("result")
        })
        this.activatedRoute.queryParamMap.subscribe(queryparameters => {
            this.data = queryparameters.get("allanswers");
            this.allanswer = JSON.parse(this.data);
            console.log(this.allanswer);
        })
    }

    compare(submittedAnswer: string, correctAnswer: string) {
        if (submittedAnswer == correctAnswer)
            return "green";
        else
            return "red";
    }
}
