import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes} from '@angular/router';
import {SaleComponent} from './pages/sale/sale.component';
import {QueryComponent} from "./pages/query/query.component";
import {RevisionComponent} from "./pages/revision/revision.component";
import {QueryRevisionComponent} from "./pages/query-revision/query-revision.component";
import {inject, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserToken {
  public loggedId!: boolean;
}

@Injectable({providedIn: 'root'})
export class PermissionsService {
  public canActivate(currentUser: UserToken, route: string): boolean {
    if (currentUser.loggedId) {
      return true
    }
    return false
  }

  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}

const isLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivate(inject(UserToken), route.params['id']);
};

export const routes: Routes = [
  {path: 'sale', component: SaleComponent},
  {path: 'query', component: QueryComponent, canActivate: [isLoggedIn]},
  {path: 'revision', component: RevisionComponent, canActivate: [isLoggedIn]},
  {path: 'query-revision', component: QueryRevisionComponent, canActivate: [isLoggedIn]}
];

