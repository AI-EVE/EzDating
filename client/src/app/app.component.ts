import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  accountService: AccountService = inject(AccountService);
  title = 'EzDating';
  users: any;

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser != null)
      this.accountService.currentUser.set(JSON.parse(currentUser));
  }
}
