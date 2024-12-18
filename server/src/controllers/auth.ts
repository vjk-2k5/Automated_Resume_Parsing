import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/users';

export const registerUser = async (req: Request, res: Response) => {
    const { firstName,lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser: IUser | null = await UserModel.findOne({ email });
    if (existingUser) {
        res.status(400).json({ msg: 'Email already exists' });
        return;
    }

    // Create a new user
    const user = new UserModel({ firstName,lastName ,email, password });

    await user.save();
    res.status(201).json({ success: true, data: user });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
    }

    res.status(200).json({ success: true, data: user });
};