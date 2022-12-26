import express from "express"
import cors from "cors"
import db from "./db"
import bodyParser from "body-parser"
import routes from "./routes"

import path from "path"

// db operations
db.connect()

// router settings
const app = express()
const port = process.env.PORT || 4000
// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json())
// app.use(cors())
app.use("/", routes)

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, "../frontend", "build")))
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
  })
}

if (process.env.NODE_ENV === "development") {
  app.use(cors())
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
