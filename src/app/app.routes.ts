import {Routes} from '@angular/router';
import {SaleComponent} from './sale/sale.component';
import {QueryComponent} from "./query/query.component";
import {RevisionComponent} from "./revision/revision.component";

export const routes: Routes = [
  {path: 'sale', component: SaleComponent},
  {path: 'query', component: QueryComponent},
  {path: 'revision', component: RevisionComponent}
];
