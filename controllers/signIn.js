const hundleSignIn = (req,res,db,bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password){
    return res.status(400).json('Invalid Submition form')
  }
  db.select("*")
    .from("login")
    .where({ email })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where({ email })
          .then((user) => res.json(user[0]));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};
module.exports = {
  hundleSignIn: hundleSignIn,
};
