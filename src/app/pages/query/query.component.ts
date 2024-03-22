import {Component} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {NgIf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Sale} from "../../models/Sale";
import {ButtonModule} from "primeng/button";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputNumberModule} from "primeng/inputnumber";
import {RippleModule} from "primeng/ripple";
import {SaleService} from "../../services/SaleService";

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CardModule,
    NgIf,
    SharedModule,
    TableModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    ReactiveFormsModule,
    RippleModule
  ],
  providers: [SaleService],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent {
  public searchData: string | null = null
  public sales: Sale[] = []

  constructor(
    private saleService: SaleService
  ) {
  }

  public searchSales(): void {
    if (this.searchData) {
      this.saleService.searchSales(this.searchData).subscribe({
        next: sales => this.sales = sales,
        error: err => console.log(err)
      })
    }
  }
}
