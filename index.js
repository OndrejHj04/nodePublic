const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Company = require("./models/company");

dotenv.config();
mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
const connection = process.env.CONNECTION;
app.get("/", (req, res) => {
  res.send({ msg: "Welcome" });
});

app.get("/api/companies", async (req, res) => {
  try {
    const restult = await Company.find();
    res.status(200).send({ data: restult });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/add-company", async (req, res) => {
  const company = new Company(req.body);
  try {
    await company.save();
    res.status(201).json({ data: company });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


start();

//export default app;
