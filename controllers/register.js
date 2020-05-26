const hundleRegister = (req,res,db,bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password){
    return res.status(400).json('Invalid Submition form')
  }
  const hash = bcrypt.hashSync(password, 10);
  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        hash: hash,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users").insert({
          name: name,
          email: loginEmail[0],
          joined: new Date(),
        })
        .then(data => res.json("success"))
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .catch((err) => res.status(404).json("error"));
};
module.exports = {
    hundleRegister : hundleRegister
}