import jwt from "jsonwebtoken"

export const generateActiveToken = (payload: object) => {
    return jwt.sign(payload, process.env.ACTIVE_TOKEN_KEY!, { expiresIn: "15m" })
}

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, { expiresIn: "10d" })
}

export const generateReFreshToken = (payload: object) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, { expiresIn: "9d" })
}