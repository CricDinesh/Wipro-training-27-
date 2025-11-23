const express = require("express");
const coursesRoute = require("./routes/courses");
const usersRoute = require("./routes/users");

const app = express();
app.use(express.json());

app.get("/status", (req, res) => {
  res.send("App is live");
});

app.use("/api/courses", coursesRoute);
app.use("/api/users", usersRoute);

module.exports = app;
