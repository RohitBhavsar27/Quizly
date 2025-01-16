import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../question.service';
import { AdminService, Results } from '../admin.service';

@Component({
    selector: 'app-show-results',
    imports: [FormsModule, CommonModule],
    templateUrl: './show-results.component.html',
    styleUrl: './show-results.component.css'
})
export class ShowResultsComponent implements OnInit {

    subject: string = ""
    subjects: string[] = []
    results: Results[] = [];
    pages: number[] = [];
    no: number = 0;

    constructor(private questionService: QuestionService, private adminService: AdminService) {

    }

    ngOnInit(): void {
        this.questionService.getAllSubjects().subscribe(
            array => this.subjects = array
        )
    }

    onSubjectChange(selectedSubject: string): void {
        if (selectedSubject === 'all') {
            this.getAllResults();
        } else {
            this.showResults();
        }
    }
    

    showResults() {
        this.adminService.getResults(this.subject).subscribe(array => { 
            this.results = array; 
            console.log("called") 
        });
        console.log('subject is ' + this.subject);
    }

    getAllResults() {

        this.adminService.getAllResults().subscribe(array => this.results = array);
    }

}
