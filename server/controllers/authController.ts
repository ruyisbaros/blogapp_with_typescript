import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import User from "../models/userModel"
import { generateActiveToken, generateAccessToken, generateReFreshToken } from "../config/generateToken"

const authControl = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body
            const user = await User.findOne({ account })
            if (user) {
                return res.status(500).json({ message: `${account} ID is already in use!` })
            }
            const userObj = { name, account, password }

            const active_token = generateActiveToken(userObj)

            const newUser = await User.create(userObj)


            res.status(201).json({
                status: "OK",
                message: "Acoount has been created succesufully",
                newUser,
                active_token
            })
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
}

export default authControl;