import { Request, Response, NextFunction } from "express";

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body

    if (!name) {
        return res.status(400).json({ message: "Please enter your name!" })
    } else if (name.length > 20) {
        return res.status(400).json({ message: "Name field can't be longer than 20 chars!" })
    }

    if (!account) {
        return res.status(400).json({ message: "Please enter your email or phone number!" })
    } else if (!validatePhoneNumber(account) && !validateEmail(account)) {
        return res.status(400).json({ message: "Invalid email or phone number!" })
    }

    if (!password) {
        return res.status(400).json({ message: "Please enter your password!" })
    } else if (password.length < 4) {
        return res.status(400).json({ message: "Password field must be min 4 chars!" })
    }

    next()
}

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { account, password } = req.body

    if (!account) {
        return res.status(400).json({ message: "Please enter your email or phone number!" })
    } else if (!validatePhoneNumber(account) && !validateEmail(account)) {
        return res.status(400).json({ message: "Invalid email or phone number!" })
    }

    if (!password) {
        return res.status(400).json({ message: "Please enter your password!" })
    } else if (password.length < 4) {
        return res.status(400).json({ message: "Password field must be min 4 chars!" })
    }

    next()
}

export function validatePhoneNumber(phone: string) {
    const re = /^[+]/g
    return re.test(phone)
}

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
};