//file location: services/authServices.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { CreateUserInput, LoginInput, UserResponse } from '../types/user';

export class AuthService {
    static async hashPassword(password: string): Promise<string>{ /*hash password before storing*/
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds); 
    }

    static async comaparePassword(password: string, hash: string): Promise<string>{
        return await bcrypt.comapre(password, hash);
    }

    static  generatToken(userId: string): string{/*generate jwt token*/
     */
        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error('JWT_SECRET is not defined in variables')
        }
        return jwt.sign({userId}, secret, {expireIn: '7d'});
    }

    static async register(userData: CreateUserInput): Promise<UserResponse> {
        const {password, ...userDataWithoutPassword} = userData;
    }

    const existingUser = await User.findOne({email: userData.email.toLowerCase()});
    if (existingUser){
        throw new Error('user already exists');
    }

    const passwordHash = await this.hashPassword(password);

    const user = new User({
        ...userDataWithout
    })
}
