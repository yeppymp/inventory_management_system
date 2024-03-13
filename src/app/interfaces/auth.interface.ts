export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  STAFF = 'STAFF'
}

export interface Role {
  id: number;
  name: string;
  uid: Roles;
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  roleId: number;
}
