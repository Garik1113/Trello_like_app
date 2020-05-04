require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const root = path.join(__dirname, "public");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routers/userRouter");
const bodyParser = require("body-parser");
const uri = process.env.DB_URI;
app.use(express.static(root));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === "GET" && req.accepts("html")) {
    return res.sendFile("index.html", { root });
  } else {
    return next();
  }
});

app.use("/users", UserRouter);
const startApp = async () => {
  await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startApp();
