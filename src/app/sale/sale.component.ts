import {Component, ElementRef, ViewChild} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputNumber, InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {AutoFocusModule} from "primeng/autofocus";

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
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent {

  @ViewChild('changeInput') changeInput!: ElementRef<InputNumber>;

  public description: string = "";
  public mount: string =  "";
  public showConfirmation: boolean = false;
  public submit(): void {
    this.showConfirmation = true;
  }

  public completeSale(): void {
    this.showConfirmation = false;
  }
}
