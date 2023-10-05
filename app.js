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
//   .connect(dbURL, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("Connected to DB"))
//   .catch((err) => {
//     console.log(err.message);
//   });

// function generateRandomPassword(length) {
//   // Define a character set for the password
//   const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';

//   let password = '';

//   for (let i = 0; i < length; i++) {
//     const randomIndex = crypto.randomInt(0, charset.length);
//     password += charset.charAt(randomIndex);
//   }

//   return password;
// }

// async function readExcel() {
//   try {
//     await workbook.xlsx.readFile('./AKHS-CLASS-LISTS-TERM-1-2023.xlsx'); // Replace with your Excel file's name

//     const worksheet = workbook.getWorksheet(1); // Assuming you're reading the first sheet

//     worksheet.eachRow(async (row, rowNumber) => {
//       // Process each row
//       const rowData = row.values;

//       const user_Details = {
//         name: `${ rowData[2] }`.trim(),
//         Student_ID: `${ rowData[3] }`.trim(),
//         class: `${ rowData[4] }`.trim(),
//         house: `${ rowData[6] }`.toLowerCase().trim(),
//         password: generateRandomPassword(8)
//       };
//       const user = await User.create(user_Details);
//       console.log(user_Details);
//     });
//   } catch (error) {
//     console.error('Error reading Excel file:', error);
//   }
// }

// readExcel();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});
