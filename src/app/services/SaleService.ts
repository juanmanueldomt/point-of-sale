import {Injectable} from "@angular/core";
import {Sale} from "../models/Sale";

@Injectable({providedIn: 'root'})
export class SaleService {
  constructor() {
  }

  public registerSale(sale: Sale){
    console.log("Venta registrada");
  }
}
