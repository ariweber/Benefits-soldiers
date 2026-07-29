import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({});
});

app.listen(PORT, () => {
  console.log(`server runing on port${PORT}`);
});
