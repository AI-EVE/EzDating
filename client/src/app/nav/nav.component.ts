import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  private router: Router = inject(Router);
  private toastrService: ToastrService = inject(ToastrService);
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success('Logged in successfully');
        this.model = {};
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        console.log(err);
        for (let i = 0; i < err.length; i++) {
          this.toastrService.error(err[i]);
        }
      },
      complete: () => console.log('response completed'),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastrService.info('Logged out');
  }
}
