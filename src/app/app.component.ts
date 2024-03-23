import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MenubarModule} from "primeng/menubar";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {UserService} from "./services/UserService";
import {User} from "./models/User";
import {UserToken} from "./app.routes";
import {MenuItem, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, HttpClientModule, ButtonModule, DialogModule, NgIf, FormsModule, InputTextModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService, MessageService]
})
export class AppComponent implements OnInit{
  public items: MenuItem[] = [];
  public title = 'PointOfSale';
  public showLogin: boolean = false;
  public isLogged: boolean = false;
  public pass: string = "";
  public user: string = "";

  constructor(
    private userService: UserService,
    private tokenUser: UserToken,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeMenu();
  }

  public showDialog(): void {
    this.showLogin = true
  }

  public login(): void {
    const user = new User()
    user.user = this.user
    user.pass = this.pass
    this.userService.login(user).subscribe({
      next: () => {
        this.tokenUser.loggedId = true
        this.isLogged = true
        this.showLogin = false
        this.initializeMenu()
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'No se ha iniciado sesion', detail: err.error.message})
      }
    })
  }

  public logout(): void {
    this.isLogged = false
    this.tokenUser.loggedId = false
    this.initializeMenu()
    this.router.navigate(['/'])
  }

  private initializeMenu(): void {
    this.items = [
      {
        label: 'Ventas',
        icon: 'pi pi-dollar',
        routerLink: "/sale",
      },
      {
        label: 'Gestion',
        icon: 'pi pi-fw pi-file',
        visible: this.isLogged,
        items: [
          {
            label: "Corte de caja",
            icon: "pi pi-inbox",
            routerLink: "/revision",
            visible: this.isLogged
          },
          {
            label: "Consulta",
            icon: "pi pi-search",
            routerLink: "/query",
            visible: this.isLogged
          },
          {
            label: "Ver cortes",
            icon: "pi pi-book",
            routerLink: "/query-revision",
            visible: this.isLogged
          },
        ]
      },
    ];
  }
}
