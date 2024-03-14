import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenubarModule} from "primeng/menubar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public items: any;
  title = 'PointOfSale';

  ngOnInit() {
    this.items = [
      {
        label: 'Ventas',
        icon: 'pi pi-dollar',
        routerLink: "/sale"
      },
      {
        label: 'Gestion',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: "Corte de caja",
            icon: "pi pi-inbox",
            routerLink: "/revision"
          },
          {
            label: "Consulta",
            icon: "pi pi-search",
            routerLink: "/query"
          }
        ]
      }
    ];
  }
}
