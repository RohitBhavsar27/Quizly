import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    imports: [],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
    constructor(private router: Router) {

    }

    showQuestion() {
        this.router.navigateByUrl("manageQuestions");
    }

    showResults() {
        this.router.navigateByUrl("showResults");
    }
}
