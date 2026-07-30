import express from "express";
import "dotenv/config";
import soldiersRouter from "./routes/soldiers.router.js";
import budgetRouter from "./routes/budget.router.js";

const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({});
});

app.use("/soldiers", soldiersRouter);
app.use("/budgets", budgetRouter);


app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    success: false,
    message: status === 500 ? "internal server error" : error.message,
    ...(status !== 500 && error.details ? error.details : {}),
  });
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
