export interface IUser{
    _id? : string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    createdAt: Date;
}

export type UserResponse = Omit<IUser, 'passwordHash'>;
export type CreateUserInput = Omit<IUser, '_id'| 'createdAt' | 'passwordHash'> & {password: string};
export type LoginInput = {
    email: string;
    password: string;
};