import { Injectable } from '@angular/core';

import { Role, Roles, User } from '@interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  roles: Role[] = [
    {
      id: 1,
      name: 'Administrator',
      uid: Roles.ADMINISTRATOR,
    },
    {
      id: 2,
      name: 'Staff',
      uid: Roles.STAFF,
    },
  ];
  users: User[] = [
    {
      id: 1,
      name: 'Administrator',
      username: 'admin',
      password: 'admin',
      roleId: 1,
    },
    {
      id: 2,
      name: 'Staff',
      username: 'staff',
      password: 'staff',
      roleId: 2,
    },
  ];

  user!: User | null;

  isAuthenticated() {
   return Boolean(this.user);
  }

  getRole(roleId: number) {
    return this.roles.find((role) => role.id === roleId);
  }

  getUserRole() {
    if (!this.user) return null;

    const role = this.getRole(this.user.roleId);
    return role?.uid;
  }

  getUserByUserName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  setUser(user: User | null) {
    this.user = user;
    return this.user;
  }
}
