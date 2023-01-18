const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuiddv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let users = [
  { id: 0, name: "Hajar", age: 21 },
  {
    id: 1,
    name: "Elnur",
    age: 21,
  },
];

let idCounter = 2;

//! Get all users
app.get("/users", (req, res) => {
  res.status(200).send(users);
  //   res.json({
  //     success: true,
  //     quantity: users.length,
  //     data: users,
  //   });
});

//! Get user by id
app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((u) => u.id === idCounter);
  if (!user) {
    return res.json({
      success: false,
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

//! Add user
app.post("/users", (req, res) => {
  const id = uuiddv4();

  const newUser = { ...req.body, id: id };
  users = [...users, newUser];

  res.json({
    success: true,
    data: users,
  });
});

//! Delete user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  users = users.filter((u) => u.id != id);

  res.json({
    success: true,
    data: users,
  });
});

//! Update user
app.put("/users/:id", (req, res) => {
  const id = +req.params.id;

  users = users.filter((elem) => elem.id !== id);

  const updatedUser = {
    id: +req.params.id,
    name: req.body.name,
    age: req.body.age,
  };

  users.push(updatedUser);
  res.json({
    success: true,
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on the Port: ${PORT}`);
});
