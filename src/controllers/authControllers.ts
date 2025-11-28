//file location: controllers/authController.ts
import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import {registerSchema, loginSchema} from '../schemas/user';
import type { RegisterInput, LoginInput} from '../schemas/user';

export const register = async (req: Request, res: Response): Promise<void> => {
    
}
