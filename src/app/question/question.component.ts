import { Component, OnInit } from '@angular/core';
import { Answer, Questions, QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Results } from '../admin.service';
import { ResultService } from '../result.service';

@Component({
    selector: 'app-question',
    imports: [FormsModule, CommonModule],
    templateUrl: './question.component.html',
    styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {

    subject: any = '';
    questions: Questions[] = [];
    question: Questions = new Questions(0, '', '', '', '', '', '', '');
    message: any = '';
    username: any = '';
    index: number = 0;
    allAnswers: Answer[] = [];
    answer: Answer = new Answer(0, '', '', '');
    submittedAnswer: string = ''; // Set default submittedAnswer value to an empty string 
    score: number = 0
    selected: boolean; // Set default selected value to an empty string 


    constructor(private questionService: QuestionService, private resultService: ResultService, private router: Router) {
        this.message = sessionStorage.getItem("message");
        this.subject = sessionStorage.getItem("subject");
        this.username = sessionStorage.getItem("username");
        this.selected = false; // Set default selected value to an empty string 
    }

    // Get all question related to subject on page load
    ngOnInit(): void {
        this.questionService.getAllQuestions(this.subject).subscribe(array => { this.questions = array; this.question = this.questions[0]; });

    }

    // Nvaigate to next question until reach last question 
    navigateNext() {
        if (this.index < this.questions.length - 1) {
            this.index = this.index + 1
            this.question = this.questions[this.index]
        } else {
            this.question = this.questions[this.questions.length - 1]
        }
    }
    // Nvaigate to previous question until reach first question 
    navigatePrevious() {
        if (this.index > 0) {
            this.index = this.index - 1
            this.question = this.questions[this.index]
        } else {
            this.question = this.questions[0]
        }
    }

    isChecked(option: string) {
        //console.log(this.allAnswers.length);

        for (var i = 0; i < this.allAnswers.length; i++) {
            let answer = this.allAnswers[i];
            // console.log(answer.submittedAnswer + " " + option);
            if (answer.qno == this.question.qno && answer.submittedAnswer.trim() == option.trim()) {
                return true;
            }
        }
        return false;
    }

    saveAnswer() {
        this.answer = new Answer(this.question.qno, this.question.qtext, this.submittedAnswer, this.question.answer)
        var indexOfElement = this.allAnswers.findIndex(answer => this.answer.qno == answer.qno)

        // if answer is already present and if need br then update it and if not present then push it
        if (indexOfElement == -1) {
            this.allAnswers.push(this.answer)
        } else {
            this.allAnswers[indexOfElement].submittedAnswer = this.answer.submittedAnswer
        }
        console.log(JSON.stringify(this.allAnswers));
    }

    endExam() {
        for (var i = 0; i < this.allAnswers.length; i++) {
            var answer = this.allAnswers[i];
            console.log(answer.submittedAnswer + " " + answer.correctAnswer);

            if (answer.submittedAnswer == answer.correctAnswer) {
                this.score = this.score + 1
            }
        }
        var result = new Results(this.username, this.subject, this.score);
        this.resultService.saveResults(result).subscribe();
        this.router.navigate(['result'], { queryParams: { 'result': this.score, 'allanswers': JSON.stringify(this.allAnswers) } });
    }
}
