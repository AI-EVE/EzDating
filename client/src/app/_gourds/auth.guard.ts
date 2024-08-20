import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService: AccountService = inject(AccountService);
  const toastrService: ToastrService = inject(ToastrService);

  if (!accountService.currentUser()) {
    toastrService.error('You must be authenticated to access this page');
    return false;
  } else {
    return true;
  }
};
