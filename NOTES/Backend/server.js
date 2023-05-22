const express = require("express");
const note = require("./data/notes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dbConnection = require("./configdb");
const userRoutes = require("./routes/userRouter");
const notesRoutes = require("./routes/notesRoutes");
const { noFound, errorhandler } = require("./middleware/errMiddleware");

const app = express();

dotenv.config();
// DB Connection in the Config file
dbConnection();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("server is running...");
});

app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);


app.use(noFound);
app.use(errorhandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server is running");
});
