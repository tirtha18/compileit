import { Request, Response, Router } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// user register
const userRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        return res.status(201).json({ user: user._id });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

// user login
const userLogin = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ user: user }, 'secret');
        return res.status(200).json({ user_id: user._id, token });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

// delete user
const userDelete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

// update user
const userUpdate = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

// get user
const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Id is required' });
    try {
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        return res.status(200).json({ user });
    }
    catch (error) { return res.status(400).json({ error }); }
}


export { userRegister, userLogin, userDelete, userUpdate, getUser };
