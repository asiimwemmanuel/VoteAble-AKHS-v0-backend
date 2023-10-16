const nodemailer = require("nodemailer");

async function sendEmail(options) {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		// host: process.env.SMTP_HOST,
		// port: process.env.SMTP_PORT,
		service: "gmail",
		auth: {
			user: process.env.USER,
			pass: process.env.PASS,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Joshua Mukisa" <kiryowajoshua22@gmail.com>', // sender address
		to: options.email, // list of receivers
		subject: options.subject, // Subject line
		text: options.text, // plain text body
	});

	console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
