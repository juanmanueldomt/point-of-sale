import {Component, ElementRef, ViewChild} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputNumber, InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {AutoFocusModule} from "primeng/autofocus";
import {TableModule} from "primeng/table";

import {SaleService} from "../services/SaleService";
import {Sale} from "../models/Sale";
import _ from 'lodash';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    DialogModule,
    AutoFocusModule,
    TableModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
  providers: [SaleService]
})
export class SaleComponent {

  @ViewChild('changeInput') changeInput!: ElementRef<InputNumber>;

  public lodash: any = _;

  public lastSales: Sale[] = [];
  public showConfirmation: boolean = false;


  saleForm = this.formBuilder.group({
    description: ['', Validators.required],
    mount: ['', Validators.required],
  });

  confirmForm = this.formBuilder.group({
    ingress: ['', Validators.required]
  })

  constructor(private saleService: SaleService,
              private formBuilder: FormBuilder) {
  }


  public submit(): void {
    if (this.saleForm.valid) {
      this.showConfirmation = true;
    }
  }

  public createModel(): Sale {
    const sale = new Sale();
    sale.description = this.saleForm.get('description')?.value;
    sale.mount = _.toNumber(this.saleForm.get('mount')?.value);
    sale.ingress = _.toNumber(this.confirmForm.get('ingress')?.value);
    sale.change = _.toNumber(this.confirmForm.get('ingress')?.value) - _.toNumber(this.saleForm.get('mount')?.value);
    return sale;
  }

  public completeSale(): void {

    const sale: Sale = this.createModel();

    this.saleService.registerSale(sale);
    this.lastSales.push(sale)
    this.clearFields();
    this.showConfirmation = false;
  }

  private clearFields(): void {
    this.saleForm.get('description')?.setValue('');
    this.saleForm.get('mount')?.setValue('');
    this.confirmForm.get('ingress')?.setValue('');


    this.saleForm.get('description')?.setErrors(null);
    this.saleForm.get('mount')?.setErrors(null);
    this.confirmForm.get('ingress')?.setErrors(null);

    this.saleForm.clearValidators();
    this.confirmForm.clearValidators();
  }
}
