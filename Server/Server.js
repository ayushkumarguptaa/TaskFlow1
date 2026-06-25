const express = require("express");
const app = express();
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/errorMiddleware.js")

dotenv.config();


connectDB().catch((err)=>{
console.log(err)
})
app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://task-flow-liart-delta.vercel.app"],
    credentials:
      true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/user/dashboard",require("./routes/dashboardRoutes"));
app.use("/user/auth", require("./routes/authRoutes"));
app.use("/user/boards", require("./routes/boardRoutes"));
app.use("/user/tasks", require("./routes/taskRoutes"));
app.use("/user/ai", require("./routes/aiRoutes"));

const PORT = process.env.PORT || 5000;

app.use(errorHandler)

app.listen(process.env.PORT,(req, res)=>{
    console.log(`server listen on port ${process.env.PORT}`);
})
