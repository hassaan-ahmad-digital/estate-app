import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to Database"))
  .catch(err => console.error(err))

const app = express()

const port = 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
