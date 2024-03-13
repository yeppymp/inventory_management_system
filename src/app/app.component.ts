import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { RouterOutlet, RouterLink, Router, Event, RouterEvent, NavigationEnd } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import AuthService from '@services/auth/auth.service';

import { Menu } from '@interfaces/app.interface';
import { Roles } from '@interfaces/auth.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router,
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.handleAuth();
      this.handleMenus();
    });
  }

  title = 'Inventory Management System';
  menus: Menu[] = [
    {
      name: 'Home',
      icon: 'home',
      route: '/',
      adminRequired: false,
    },
    {
      name: 'Inventories',
      icon: 'inventory',
      route: '/inventories',
      adminRequired: false,
    },
    {
      name: 'Suppliers',
      icon: 'recent_actors',
      route: '/suppliers',
      adminRequired: true,
    },
    {
      name: 'Settings',
      icon: 'settings',
      route: '/settings',
      adminRequired: true,
    },
  ];
  menusByRole: Menu[] = this.menus;

  isAuthenticated: boolean = false;
  isStaff: boolean = false;

  ngOnInit(): void {
    this.handleAuth();
    this.handleMenus();
  }

  handleAuth() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isStaff = this.authService.getUserRole() === Roles.STAFF;
  }

  handleMenus() {
    let menus = this.menus;

    if (this.isStaff) {
      menus = this.menus.filter((menu) => !menu.adminRequired);
    }

    this.menusByRole = menus;
  }

  logout() {
    this.authService.setUser(null);
    this.router.navigate(['login']);
  }
}
