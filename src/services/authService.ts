//file location: services/authServices.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import type { CreateUserInput, LoginInput, UserResponse } from '../types/user';

export class AuthService {
    static async hashPassword(password: string): Promise<string>{ /*hash password before storing*/
        const saltRounds = 12;
        return await bcrypt.hash(password, saltRounds); 
    }

    static async comparePassword(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }

    static  generateToken(userId: string): string{/*generate jwt token*/
        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error('JWT_SECRET is not defined in variables')
        }   
        return jwt.sign({userId}, secret, {expireIn: '7d'});
    }

    static async register(userData: CreateUserInput): Promise<UserResponse> {
        const {password, ...userDataWithoutPassword} = userData;
    

    const existingUser = await User.findOne({email: userData.email.toLowerCase()});
    if (existingUser){
        throw new Error('user already exists');
    }

    const passwordHash = await this.hashPassword(password);

    const user = new User({
        ...userDataWithoutPassword,
        passwordHash,
        email: userData.email.toLowerCase()
    });
    await user.save();

    const {passwordHash: _, ...userResponse} = user.toObject();
    return userResponse;
}

static async login(loginData: LoginInput): Promise<{ user: UserResponse; token: string}> {
    const {email, password} =  loginData;

    const user = await User.findOne({email: email.toLowerCase()});
    if(!user) {
        throw new Error('invalid email or password');
    }
      const isPasswordValid = await this.comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user._id.toString());

    // Return user without password and token
    const { passwordHash: _, ...userResponse } = user.toObject();
    return { user: userResponse, token };
}
}
