const { config } = require("dotenv");
config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🌱 Connected MongoDB"))
  .catch((err) => console.log("error", err));

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ["*"],
    methods: ["*"],
  })
);
app.use(blogRouter);
app.use(authRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`👾 Start server port:${process.env.PORT}`);
});
