import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const email = {
    name: "Tsubasa",
    email: "example@gmail.com",
  };

  return res.status(200).json(email);
})

app.get("/api/getEmails", (req, res) => {
  const email = {
    name: "Tsubasa",
    email: "example@gmail.com",
  };

  return res.status(200).json(email);
});

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
