const nodemailer = require("nodemailer")
import { OAuth2Client } from "google-auth-library"

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER = `${process.env.SENDER_EMAIL_ACCOUNT}`


//1.) Send Mail

const sendMail = async (name: string, to: string, url: string, txt: string) => {
    const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND)

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    try {
        const access_token = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                access_token
            }
        })
        const mailOptions = {
            from: SENDER,
            to: to,
            subject: "Account Confirmation",
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <p style="margin-bottom:20px">Hello ${name.toUpperCase()},</p>
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to My Website.</h2>
            <p>Congratulations! You're almost join our BlogApp.
                Just click to the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
          `,
        }
        const result = await transporter.sendMail(mailOptions)
        return result;
    } catch (error) {
        console.log(error)
    }
}

export default sendMail;