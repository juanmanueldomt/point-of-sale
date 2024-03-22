import {Routes} from '@angular/router';
import {SaleComponent} from './pages/sale/sale.component';
import {QueryComponent} from "./pages/query/query.component";
import {RevisionComponent} from "./pages/revision/revision.component";
import {QueryRevisionComponent} from "./pages/query-revision/query-revision.component";

export const routes: Routes = [
  {path: 'sale', component: SaleComponent},
  {path: 'query', component: QueryComponent},
  {path: 'revision', component: RevisionComponent},
  {path: 'query-revision', component: QueryRevisionComponent}
];
