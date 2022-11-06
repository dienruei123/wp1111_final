import express from "express";
import cors from "cors";
import db from "./db";
import bodyParser from "body-parser";
import routes from "./routes";

// db operations
db.connect();

// router settings
const app = express();
const port = process.env.PORT || 4000;

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
