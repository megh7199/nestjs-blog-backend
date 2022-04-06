export interface User{
    id?:number;
    name?:string;
    username?:string;
    email?:string;
    password?:string;
    role?:userRoles;
}

export enum userRoles{
    ADMIN = 'admin',
    USER = 'user',
    EDITOR = 'editor',
    CHIEF_EDITOR = 'chief editor'
}