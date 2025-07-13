import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const route = inject(Router);
  const toast = inject(ToastrService);

  if (authService.isLoggedIn()) {
    const clonedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.getToken()
      ),
    });
    return next(clonedReq).pipe(
      tap({
        error: (err: any) => {
          if (err.status == 401) {
            authService.deleteToken();
            route.navigateByUrl('/login');
            setTimeout(() => {
              toast.info('Please login Again', 'Session Expired');
            }, 1500);
          } else if (err.status == 403) {
            toast.error(
              "Ooops!! It seems you're not authorized to perform action"
            );
          }
        },
      })
    );
  } else return next(req);
};
