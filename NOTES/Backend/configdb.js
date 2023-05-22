const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/munotes", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("Connection sucessfull");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;
