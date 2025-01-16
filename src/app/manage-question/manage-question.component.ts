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
    message: string = "";

    questions: Questions = new Questions(0, '', '', '', '', '', '', '');

    constructor(private questionService: QuestionService, private router: Router) {

    }

    addQuestions() {
        this.questionService.addQuestions(this.questions).subscribe(answer => this.message = "question added");
        alert("Question Added Successfully.")
    }

    viewQuestions() {
        this.questionService.viewQuestions(this.questions.qno, this.questions.subject).subscribe(question => this.questions = question);
    }

    updateQuestions() {
        this.questionService.updateQuestions(this.questions).subscribe(answer => this.message = "question updated");
        alert("Question Updated Successfully.")

    }

    deleteQuestions() {
        this.questionService.deleteQuestions(this.questions.qno, this.questions.subject).subscribe(answer => this.message = "question deleted");
        alert("Question Deleted Successfully.")
    }

}
