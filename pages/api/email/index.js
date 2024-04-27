//source "Next js 13 API routes tutoria" chaine : Native Notify

import { transporter } from "@/config/nodemailer";
import   Welcome  from "@/emails/Welcome";
import nodemailer from "nodemailer"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

// export default async function handler(req, res) {
// 	const { method, query } = req
// 	console.log('query:', query)
// 	console.log("method", method)

// 	switch (method) {
// 		case "GET":
// 			res.status(200).json("j'ai reussi")
// 			break;

// 		case "POST":
// 			console.log("body", req.body)
// 			const data = req.body;
// 			if (!data.name || !data.email || !data.message) {
// 				return res.status(400).json("bad request")
// 			}
// 			try {
// 				await resend.emails.send({
// 					from: data.email,
// 					to: process.env.VITE_EMAIL,
// 					subject: "Message Porfolio",
// 					text: `${data.message}`,
// 					html: "<p>test</p>",
// 					name: data.name,
// });
// 				return res.status(200).json({ success: "mail envoyé avec succès !" })
// 			} catch (error) {
// 				console.log('error:', error)
// 				return res.status(400).json({ message: "bad request" })
// 			}

// 		default:
// 			res.setHeader('Allow', ["GET", "POST"])
// 			res.status(405).end(`Method ${method} not allowed`)
// 	}

// };

export default async function handler(req, res) {
	const { method, query } = req
	console.log('query:', query)
	console.log("method", method)

	switch (method) {
		case "GET":
			res.status(200).json("j'ai reussi")
			break;

		case "POST":
			console.log("body", req.body)
			const data = req.body;
			if (!data.name || !data.email || !data.message) {
				return res.status(400).json("bad request")
			}
			try {
				const mailOptions = {
					to: process.env.VITE_EMAIL,
					from: data.email,
					text: `${data.message}`,
					subject: "Message Porfolio"
				}
				await transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log(error)
					}
					console.log('email sent')
				})
				return res.status(200).json({ success: "mail envoyé avec succès !" })
			} catch (error) {
				return res.status(400).json({ message: "bad request" })
			}

		default:
			res.setHeader('Allow', ["GET", "POST"])
			res.status(405).end(`Method ${method} not allowed`)
	}

}