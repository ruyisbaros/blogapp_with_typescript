import { Request, Response } from "express";
import User from "../models/userModel"


const authControl = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body
            const user = await User.findOne({ account })
            if (user) {
                return res.status(500).json({ message: `${account} ID is already in use!` })
            }
            const newUser = new User({ name, account, password })

            await newUser.save()

            res.status(201).json({ message: "Acoount has been created succesufully", newUser })
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