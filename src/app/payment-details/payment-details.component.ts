import { Component, OnInit } from '@angular/core';
import { PayentDetailFormComponent } from './payent-detail-form/payent-detail-form.component';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  imports: [PayentDetailFormComponent, CommonModule],
  templateUrl: './payment-details.component.html',
  styles: ``,
})
export class PaymentDetailsComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  deletePaymentRecord(paymentId: number) {
    if (confirm('Are you sure u want to delete this record?')) {
      this.service.deletePaymentDetail(paymentId).subscribe({
        next: (res) => {
          this.service.list = res as PaymentDetail[];
          this.toastr.info('Record Deleted Successfully', 'Deleted Success');
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err, 'Error While Deleting');
        },
      });
    }
  }
}
