import { Component } from '@angular/core';
import { Questions, QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-manage-question',
    imports: [CommonModule, FormsModule],
    templateUrl: './manage-question.component.html',
    styleUrl: './manage-question.component.css'
})
export class ManageQuestionComponent {

    questions: Questions = new Questions(0, '', '', '', '', '', '', '');

    constructor(private questionService: QuestionService, private router: Router) {

    }

    addQuestions() {
        this.questionService.addQuestions(this.questions).subscribe(
            response => {
                if (response.success) {
                    alert("Question added successfully.");
                } else {
                    alert("Failed to add question.");
                }
            },
            error => {
                alert("Failed to add question. Please check your input.");
            }
        );
    }

    viewQuestions() {
        this.questionService.viewQuestions(this.questions.qno, this.questions.subject).subscribe(
            question => {
                this.questions = question;
            },
            error => {
                alert("Question with given data is not available.");
            }
        );
    }

    updateQuestions() {
        this.questionService.updateQuestions(this.questions).subscribe(
            response => {
                if (response.success) {
                    alert("Question updated successfully.");
                } else {
                    alert("Failed to update question.");
                }
            },
            error => {
                alert("Failed to update question. Please check your input.");
            }
        );
    }

    deleteQuestions() {
        this.questionService.deleteQuestions(this.questions.qno, this.questions.subject).subscribe(
            response => {
                if (response.success) {
                    alert("Question deleted successfully.");
                } else {
                    alert("Failed to delete question.");
                }
            },
            error => {
                alert("Question with given data is not available.");
            }
        );
    }
}



