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
export class HomeComponent {
  accountService: AccountService = inject(AccountService);
  http: HttpClient = inject(HttpClient);
  registerMode: boolean = false;
  users: any;


  toggleRegister() {
    this.registerMode = !this.registerMode;
  }
}
