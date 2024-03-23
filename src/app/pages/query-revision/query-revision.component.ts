import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {FieldsetModule} from "primeng/fieldset";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {SharedModule} from "primeng/api";
import {SplitterModule} from "primeng/splitter";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {Sale} from "../../models/Sale";
import {RevisionTotal} from "../../models/RevisionTotal";
import _ from "lodash";
import {RevisionService} from "../../services/RevisionService";
import {SaleService} from "../../services/SaleService";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-query-revision',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    FieldsetModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    RippleModule,
    ScrollPanelModule,
    SharedModule,
    SplitterModule,
    TableModule,
    ToastModule,
    NgClass,
    DropdownModule,

  ],
  providers: [RevisionService, SaleService],
  templateUrl: './query-revision.component.html',
  styleUrl: './query-revision.component.css'
})
export class QueryRevisionComponent {

  public revisions: RevisionTotal[] = []
  public sales: Sale[] = [];

  public selectedRevision: RevisionTotal = new RevisionTotal();

  public toRevision: RevisionTotal = new RevisionTotal()

  public saleTotal: number = 0;
  public spentTotal: number = 0;
  public total: number = 0;
  public result: number = 0;


  public lodash = _
  constructor(
    private revisionService: RevisionService,
    private saleService: SaleService,
  ) {
    this.toRevision.total = 0
    this.toRevision.isSetMoney = false
  }

  public ngOnInit(): void {
    this.loadRevisions()
  }

  private loadRevisions(): void {
    this.revisionService.getRevisions().subscribe({
      next: revisions => {
        this.revisions = revisions
        this.selectedRevision = revisions[0]
        this.selectRevision()
      },
      error: err => console.log(err)
    })
  }

  public selectRevision(): void {
    if (this.selectedRevision) {
      this.saleService.getSalesFromRevision(this.selectedRevision.id).subscribe({
        next: sales => {
          this.sales = sales
          this.total = 0
          this.saleTotal = 0
          this.spentTotal = 0
          this.sales.forEach(sale => {
            if (sale.mount >= 0) {
              this.saleTotal += sale.mount
            } else {
              this.spentTotal += sale.mount
            }
            this.total = this.saleTotal + this.spentTotal
          })
        },
        error: err => console.log(err)
      })
    } else {
      this.sales = []
    }
  }

}
