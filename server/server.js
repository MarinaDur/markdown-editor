import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

// const password = encodeURIComponent();
// console.log(password);

mongoose.set("debug", true);

//////////CONNECT TO DB/////////////
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.ENCODED_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("SUCCESSFULLY CONNECTED"))
  .catch((err) => console.log(err));

////////////******MODERN WAY CONNECT TO THE db*********////////////

// async function main() {
//   await mongoose.connect(DB).then(() => console.log('Connected to database'));
// }
// main().catch((err) => console.log(err));

// const app = require("./app");
// console.log(process.env);

/////////////////START SERVER/////////////////

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
