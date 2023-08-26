import { KeyPermissions } from "./permissions";

export interface IRole {
    _id: string;
    name: string;
    permissions: [KeyPermissions];
    users: string[];
    createdAt: Date;
    updatedAt: Date;
}