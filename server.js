require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const root = path.join(__dirname, "public");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routers/userRouter");
const TeamRouter = require("./routers/teamRouter");
const bodyParser = require("body-parser");
const uri = process.env.DB_URI;
app.use(express.static(root));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === "GET" && req.accepts("html")) {
    if (req.path === "/login" || req.path === "/signup") {
      return res.sendFile("index.html", { root });
    } else {
      return next();
    }
  } else {
    return next();
  }
});
//Routes
app.use("/users", UserRouter);
app.use("/teams", TeamRouter);
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

// const text = "check http://youtube.com, check this link http://google.com";
// function convert(text) {
//   var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
//   var text1 = text.replace(exp, "<a href='$1'>$1</a>");
//   var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

//   // const text2 = text1.replace(
//   //   exp2,
//   //   '$1<a target="_blank" href="http://$2">$2</a>'
//   // );
//   const text2 = text1.replace(exp2, text1);

//   console.log(text2);
// }

// convert(text);
