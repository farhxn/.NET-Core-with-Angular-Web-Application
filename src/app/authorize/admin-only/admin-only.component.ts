import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-admin-only',
  imports: [CommonModule],
  templateUrl: './admin-only.component.html',
  styles: ``,
})
export class AdminOnlyComponent implements OnInit,AfterViewInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  users: any[] = [];

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#userTable').DataTable();
    }, 0);
  }

  ngOnInit(): void {
    this.userService.getUsersList().subscribe({
      next: (res: any) => {
        this.users = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err, 'Unexpected Error Occured');
      },
    });

   
  }
}
