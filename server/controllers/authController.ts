import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import User from "../models/userModel"
import { generateActiveToken, generateAccessToken, generateReFreshToken } from "../config/generateToken"
import sendMail from "../config/send_mail"
import { validatePhoneNumber, validateEmail } from "../middlewares/valid"
import { sendSMS } from "../config/send_sms"

import { INewUser } from "../interfaces/decoded_interface"

const ROOT_URL = `${process.env.SERVER_URL}`

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
            } else if (validatePhoneNumber(account)) {
                sendSMS(name, account, url, "Verify your phone number")
                return res.json({ message: "Success! Please check your phone and verify your account!" })
            }

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },

    activateRegister: async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const decoded = jwt.verify(token, `${process.env.ACTIVE_TOKEN_KEY}`)
            const { name, account, password } = decoded as INewUser

            if (!account) return res.status(500).json({ message: "Invalid authentication. Please retry for registering!" })
            //console.log(account)
            const tokenObj = { name, account, password }
            const access_token = generateAccessToken(tokenObj)
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, account, password: hashedPassword })

            res.status(200).json({
                message: "Account has been activated",
                newUser,
                access_token
            })

        } catch (err: any) {
            //console.log({ ...err })
            let errMessage;
            if (err.code === 11000) {
                const obj = err.keyValue
                errMessage = obj.account + " already exist!"
            } else if (err.name === "TokenExpiredError") {
                errMessage = "Oooppsss! You should activate your account through the mail which has been sent, max in 15 minutes!"
            }
            return res.status(500).json({ message: errMessage })
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