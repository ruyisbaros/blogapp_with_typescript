import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import User from "../models/userModel"
import { generateActiveToken, generateAccessToken, generateReFreshToken } from "../config/generateToken"
import sendMail from "../config/send_mail"
import { validatePhoneNumber, validateEmail } from "../middlewares/valid"

const ROOT_URL = `${process.env.ROOT_URL}`

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
            const url = `${ROOT_URL}/activate_account/${active_token}`

            if (validateEmail(account)) {
                sendMail(name, account, url, "Please verify your Email address!")
                return res.json({ message: "Success! Please check your email and verify your account!" })
            }

            //const newUser = await User.create(userObj)

            /* res.status(201).json({
                status: "OK",
                message: "Acoount has been created succesufully",
                userObj,
                active_token
            }) */

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