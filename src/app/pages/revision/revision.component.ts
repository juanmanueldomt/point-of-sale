import {Component, OnInit} from '@angular/core';
import {Sale} from "../../models/Sale";
import {CardModule} from "primeng/card";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {RevisionTotal} from "../../models/RevisionTotal";
import {RevisionService} from "../../services/RevisionService";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SaleService} from "../../services/SaleService";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {SplitterModule} from "primeng/splitter";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import _ from 'lodash';
import {FieldsetModule} from "primeng/fieldset";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {RippleModule} from "primeng/ripple";
import {BadgeModule} from "primeng/badge";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-revision',
  standalone: true,
  imports: [
    CardModule,
    SharedModule,
    TableModule,
    DropdownModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    SplitterModule,
    ScrollPanelModule,
    DatePipe,
    FieldsetModule,
    ButtonModule,
    InputNumberModule,
    NgIf,
    ReactiveFormsModule,
    RippleModule,
    BadgeModule,
    NgClass,
    ToastModule,
  ],
  providers: [RevisionService, SaleService, MessageService],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent implements OnInit {

  public sales: Sale[] = [];

  public selectedRevision: RevisionTotal = new RevisionTotal();

  public revision: RevisionTotal = new RevisionTotal()

  public saleTotal: number = 0;
  public spentTotal: number = 0;
  public total: number = 0;

  public lodash = _

  revisionForm = this.formBuilder.group({
    singleCoins: [0],
    tenCoins: [0],
    twenties: [0],
    fifties: [0],
    hundreds: [0],
    twoHundreds: [0],
    fiveHundreds: [0],
  });

  constructor(
    private revisionService: RevisionService,
    private saleService: SaleService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.revision.total = 0
    this.revision.isSetMoney = false
  }

  public ngOnInit(): void {
    this.loadRevisions()
    this.revisionForm.valueChanges.subscribe(() => {
      this.updateTotals();
    })
  }

  private loadRevisions(): void {
    this.revisionService.getLastRevision().subscribe({
      next: revision => {
        this.selectedRevision = revision
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

  public doRevision(): void {
    if (this.revisionForm.valid) {
      const revision = this.getRevisionModel()
      this.revisionService.create(revision).subscribe({
        next: revision => {
          this.loadRevisions()
          this.revisionForm.reset()
          this.messageService.add({
            severity: 'success',
            summary: 'Revision completada',
            detail: 'La revision se ha realizado correctamente'
          });
        },
        error: (error) => console.log(error)
      })
    }
  }

  public updateTotals(): void {
    if (this.revision) {
      this.revision.total =
        _.toNumber(this.revisionForm.get("singleCoins")?.value) +
        _.toNumber(this.revisionForm.get("tenCoins")?.value) +
        _.toNumber(this.revisionForm.get("twenties")?.value) +
        _.toNumber(this.revisionForm.get("fifties")?.value) +
        _.toNumber(this.revisionForm.get("hundreds")?.value) +
        _.toNumber(this.revisionForm.get("twoHundreds")?.value) +
        _.toNumber(this.revisionForm.get("fiveHundreds")?.value)
    }
  }

  private getRevisionModel() {
    const revision = new RevisionTotal();

    revision.singleCoins = _.toNumber(this.revisionForm.get("singleCoins")?.value)
    revision.tenCoins = _.toNumber(this.revisionForm.get("tenCoins")?.value)
    revision.twenties = _.toNumber(this.revisionForm.get("twenties")?.value)
    revision.fifties = _.toNumber(this.revisionForm.get("fifties")?.value)
    revision.hundreds = _.toNumber(this.revisionForm.get("hundreds")?.value)
    revision.twoHundreds = _.toNumber(this.revisionForm.get("twoHundreds")?.value)
    revision.fiveHundreds = _.toNumber(this.revisionForm.get("fiveHundreds")?.value)
    revision.isSetMoney = false

    revision.total = this.revision.total
    revision.totalSpent = this.spentTotal
    revision.totalSale = this.saleTotal
    revision.result = _.toNumber(this.revision.total) - (
      _.toNumber(this.selectedRevision.total) +
      _.toNumber(this.total))
    return revision;
  }
}
