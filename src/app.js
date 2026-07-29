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
  res.status(error.status || 500).json({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`server runing on port${PORT}`);
});
