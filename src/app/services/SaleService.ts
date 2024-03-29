import {Injectable} from "@angular/core";
import {Sale} from "../models/Sale";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({providedIn: 'root'})
export class SaleService {
  constructor(
    private http: HttpClient
  ) {
  }

  public registerSale(sale: Sale) {
    return this.http.post(`${environment.serverUrl}/sale/create`, sale)
  }

  public getRecentSales(): Observable<Sale[]> {
    return this.http.get(`${environment.serverUrl}/sale/recent-sale`) as Observable<Sale[]>
  }

  public getSalesFromRevision(id: number): Observable<Sale[]> {
    return this.http.get(`${environment.serverUrl}/sale/by-revision`, {params: {revisionId: id}}) as Observable<Sale[]>
  }

  public searchSales(searchData: string): Observable<Sale[]> {
    return this.http.get(`${environment.serverUrl}/sale/search`, {params: {data: searchData}}) as Observable<Sale[]>
  }
}
