const express = require("express");
const bcryptjs = require("bcryptjs");

const app = express();
app.use(express.json());

const users = []

app.get("/users", (req, res) => {
  res.status(200).json(users);
})

app.post("/users", (req, res) => {
  const {username} = req.body;
  try {
    const password = bcryptjs.hashSync(req.body.password, 12);
    users.push({username, password});
    res.status(200).json({username, password});
  } catch (err) {
    throw new Error(err);
  }

});

app.post("/users/login", (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (user === null) {
    res.status(400).json("Cannot find user");
  } else {
    console.log(user, req.body);
    const hasValidPassword = bcryptjs.compareSync(req.body.password, user.password);
    try {
      if (hasValidPassword) {
        res.status(200).json("Success");
      } else {
        res.status(400).json("Invalid Password");
      }
    } catch (err) {
      res.status(500).json("Server Error");
    }
  }
})

app.listen(3000, () => console.log("PORT 3000"));