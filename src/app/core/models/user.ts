export interface User {

    email: string;
    fullName: string;
    password: string;
    //role: 'USER' | 'ADMIN' | 'SALES' | 'WH' | 'LOG' | 'PROC' | 'APPR' | 'RIDER';
}

export interface TokenUser {
    email?: string;
    fullName?: string;
    name?: string;
    username?: string;
    sub?: string;
    role?: string | string[];
    roles?: string[];
}
