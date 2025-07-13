import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { authGuard } from './shared/auth.guard';
import { AdminOnlyComponent } from './authorize/admin-only/admin-only.component';
import { AdminOrTeacherComponent } from './authorize/admin-or-teacher/admin-or-teacher.component';
import { ApplyForMaternityLeaveComponent } from './authorize/apply-for-maternity-leave/apply-for-maternity-leave.component';
import { LibraryMembersOnlyComponent } from './authorize/library-members-only/library-members-only.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { claimReq } from './shared/utils/claimReq-utils';
import { Under10AndFemaleComponent } from './authorize/under10-and-female/under10-and-female.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admin-only',
        component: AdminOnlyComponent,
        data: { claimReq: claimReq.adminOnly },
      },

      {
        path: 'admin-or-teacher',
        component: AdminOrTeacherComponent,
        data: {
          claimReq: claimReq.adminOrTeacherOnly,
        },
      },

      {
        path: 'apply-for-maternity-leave',
        component: ApplyForMaternityLeaveComponent,
        data: { claimReq: claimReq.MatenarityLeave },
      },

      {
        path: 'library-members-only',
        component: LibraryMembersOnlyComponent,
        data: { claimReq: claimReq.HasLibraryId },
      },

      {
        path: 'Under10AndFemale',
        component: Under10AndFemaleComponent,
        data: { claimReq: claimReq.femaleBelow10 },
      },

      {
        path: 'payment',
        component: PaymentDetailsComponent,
      },

      {
        path: 'forbidden',
        component: ForbiddenComponent,
      },
    ],
  },
];
