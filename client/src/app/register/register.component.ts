import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  cancelRegister = output<boolean>();
  acountsService: AccountService = inject(AccountService);
  private toastrService: ToastrService = inject(ToastrService);
  model: any = {};

  register() {
    this.acountsService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success('Registration successful');
        this.cancel();
      },
      error: (err) => {
        console.log(err);
        for (let i = 0; i < err.length; i++) {
          this.toastrService.error(err[i]);
        }
      },
      complete: () => console.log('response completed'),
    });
    this.model = {};
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
