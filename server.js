const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "becim",
    database: "face_recognition",
  },
});
app.use(express.json());
app.use(cors());

app.post("/signIn", (req, res) => signIn.hundleSignIn(req,res,db,bcrypt));
app.post("/register", (req, res) => register.hundleRegister(req, res, db, bcrypt));
app.get("/profile/:id", (req, res) => profile.hundleProfile(req,res,db));
app.put("/image", (req, res) => image.hundleImage(req,res,db));
app.post("/imageUrl", (req, res) => image.hundleAPI(req,res));
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
