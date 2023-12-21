const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

//dotenv config
dotenv.config({ path: "backend/config/config.env" });

//mongodb connection
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/tasks", require("./routes/userRoutes"));

// --------------------------deployment-purpose------------------------------
const __dirname1 = path.resolve();
console.log(__dirname1);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment-purpose------------------------------

const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`
  );
});
