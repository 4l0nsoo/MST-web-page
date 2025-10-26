export type UserType = "admin" | "client";

export interface BaseUser {
  id: string;
  type: string;
}

export interface AdminUser extends BaseUser {
  email: string;
  passwordHash: string;
  type: "admin";
}

export interface ClientUser extends BaseUser {
    type: "client";
    ref: string;
    computerStatus: string;
    note?: string;
    estimatedTime?: string;
}

export type User = AdminUser | ClientUser;

export const users: User[] = [
  {
    id: "1",
    type: "admin",
    email: "admin@tecnostore.com",
    passwordHash: "admin", 
  },
  {
    id: "2",
    type: "client",
    ref: "REF-12345",
    computerStatus: "En diagnóstico",
    note: "Pantalla azul intermitente",
    estimatedTime: "3 días",
  },
];


