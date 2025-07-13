import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payent-detail-form',
  imports: [FormsModule],
  templateUrl: './payent-detail-form.component.html',
  styles: ``,
})
export class PayentDetailFormComponent {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0) {
        this.insertRecord(form);
      } else {
        this.updateRecord(form);
      }
    } else {
      this.toastr.error('Fill the required Fields', 'All Fields are Required');
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: (res) => {
        this.toastr.success(
          'Inserted Successfully',
          'Payment Detail Register',
          {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            tapToDismiss: true,
            toastClass: 'custom-toast-class ngx-toastr',
          }
        );
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
      },
      error: (err) => {
        this.toastr.error(err, 'Unable to Insert Record');
        console.error('Error on Submitting Form : ' + err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: (res) => {
        this.toastr.success('Updated Successfully', 'Payment Detail Updated');
        this.service.list = res as PaymentDetail[];
        this.service.resetForm(form);
      },
      error: (err) => {
        this.toastr.error(err, 'Unable to Update Record');
        console.error('Error on Submitting Form : ' + err);
      },
    });
  }
}
