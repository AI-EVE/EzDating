import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.log(err),
      complete: () => console.log('response completed'),
    });
    this.model = {};
  }

  logout() {
    this.accountService.logout()
  }
}
