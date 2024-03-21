import { Component } from '@angular/core';
import {Sale} from "../../models/Sale";
import {CardModule} from "primeng/card";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {RevisionTotal} from "../../models/RevisionTotal";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-revision',
  standalone: true,
  imports: [
    CardModule,
    SharedModule,
    TableModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent {
  public revisions: RevisionTotal[] = [];
  public sales: Sale[] = [];

  public selectedRevision?: RevisionTotal;
}
