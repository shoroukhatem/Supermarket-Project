
const express = require("express")
const app = express();
const marketRouter = require('./market')


app.use("/market", marketRouter);
app.listen(5000, () => {
  console.log("server running")
});