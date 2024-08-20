import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

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

  model: any = {};

  register() {
    this.acountsService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (err) => console.log(err),
      complete: () => console.log('response completed'),
    });
    this.model = {};
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
