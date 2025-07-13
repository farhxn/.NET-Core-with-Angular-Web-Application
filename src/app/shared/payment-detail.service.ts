import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { catchError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  url: string = environment.apiBaseUrl + '/PaymentDetails';
  list: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted : boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  refreshList() {
    this.http
      .get(this.url)
      .pipe(
        catchError((error) => {
          this.toastr.error(error, 'Unable to Fetch Payment List');
          console.error('Error fetching Payments:', error);
          throw error;
        })
      )
      .subscribe({
        next: (res) => {
          this.list = res as PaymentDetail[];
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err, 'Unable to Save Data');
          console.error(err);
        },
      });
  }

  postPaymentDetail() {
    return this.http.post(this.url, this.formData);
  }

  putPaymentDetail() {
    return this.http.put(this.url+'/'+this.formData.paymentDetailId, this.formData);
  }

  deletePaymentDetail(id:number) {
    return this.http.delete(this.url+'/'+id);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false
  }
}
