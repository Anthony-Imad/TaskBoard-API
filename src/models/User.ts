//file location: models/user.ts
import mongoose, { Schema, Document, type Types, type Model} from 'mongoose';
import {type IUser} from '../types/user';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [10, "name cannot be more than 100 characters"]
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model<IUserDocument>('User', userSchema);  