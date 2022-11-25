import { Twilio } from "twilio"
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const SENDER = `${process.env.TWILIO_NUMBER}`

const client = new Twilio(accountSid, authToken)

export const sendSMS = (name: string, to: string, body: string, txt: string) => {
    try {
        client.messages
            .create({
                body: `Hello ${name.toUpperCase()}, MyBlogApp ${txt} - ${body}`,
                from: SENDER,
                to
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.log(error)
    }
}

