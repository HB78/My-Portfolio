import nodemailer from "nodemailer"

const email = process.env.VITE_EMAIL
const pass = process.env.VITE_PASSWORD
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass
    }
});
