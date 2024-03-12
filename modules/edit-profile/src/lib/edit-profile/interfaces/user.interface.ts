export interface UserInfo {
    id?: number;
    name: string;
    email: string;
    height: number | string;
    weight: number | string;
    birthday: string;
    password: string;
    goal?: string;
}