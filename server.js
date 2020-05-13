require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const root = path.join(__dirname, "public");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routers/userRouter");
const TeamRouter = require("./routers/teamRouter");
const BoardRouter = require("./routers/boardRoutes");
const ListRouter = require("./routers/listRouter");
const CardRouter = require("./routers/cardRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const uri = process.env.DB_URI;
app.use(express.static(root));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes;
app.use("/users", UserRouter);
app.use("/teams", TeamRouter);
app.use("/boards", BoardRouter);
app.use("/lists", ListRouter);
app.use("/cards", CardRouter);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

const startApp = async () => {
  await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
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
