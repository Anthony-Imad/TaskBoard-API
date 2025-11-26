//file location: types/user/ts
import { type Types } from 'mongoose';
export interface IUser{
    _id : Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    createdAt: Date;
}

export type UserResponse = Omit<IUser, 'passwordHash' | '_id'> & {
    _id: string;
};
export type CreateUserInput = Omit<IUser, '_id'| 'createdAt' | 'passwordHash'> & {
    password: string
};
export type LoginInput = {
    email: string;
    password: string;
};