import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  accountService: AccountService = inject(AccountService);
  http: HttpClient = inject(HttpClient);
  registerMode: boolean = false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('There was an error!', err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
