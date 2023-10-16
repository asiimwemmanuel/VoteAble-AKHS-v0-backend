const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
// const authRoutes = require("./src/routes/authRoutes");
const pollRoutes = require("./src/routes/router.js");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./src/middleware/err");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const crypto = require('crypto');
const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const User = require('./src/models/user.js');
const Poll = require('./src/models/polls.js');

dotenv.config({ path: "config.env" });
app.use(
	cors({
		origin: "https://voteable-app.onrender.com",
		credentials: true,
	})
);

app.use("/webhook", express.raw({ type: "application/json" }));
app.use(morgan("dev"));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
// app.use(authRoutes);
app.use(pollRoutes);
app.use(errorHandler);

const dbURL = process.env.dbURL;

mongoose.set('strictQuery', true);
mongoose
	.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to DB"))
	.catch((err) => {
		console.log(err.message);
	});

// mongoose.set('strictQuery', true);
// mongoose
//	 .connect(dbURL, {
//		 useNewUrlParser: true,
//	 })
//	 .then(() => console.log("Connected to DB"))
//	 .catch((err) => {
//		 console.log(err.message);
//	 });

const create_excel = async function () {
	const Polls = await Poll.find();
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet('Poll Data');

	// Add headers for the Excel file
	worksheet.addRow(['Question', 'Option', 'Votes']);

	// Loop through your poll data and add it to the worksheet
	Polls.forEach(poll => {
		const question = poll.question;

		poll.options.forEach(option => {
			worksheet.addRow([question, option.text, option.votes]);
		});
	});
	// Generate the Excel file
	const filePath = 'poll_data.xlsx'; // Specify the file path
	await workbook.xlsx.writeFile(filePath);

	console.log(`Excel file created at ${ filePath }`);
};

create_excel();

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${ PORT }`);
});
