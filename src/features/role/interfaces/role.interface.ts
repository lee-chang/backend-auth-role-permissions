import { KeyPermissions } from "./permissions";

export interface IRole {
    id: string;
    name: string;
    permissions: [KeyPermissions];
    users: string[];
    createdAt: Date;
    updatedAt: Date;
}