const hundleProfile = (req,res,db) => {
    const { id } = req.params;
    db.select("*")
      .from("users")
      .where({ id })
      .then((user) => (user.length ? res.json(user) : res.json("Not found !!")))
      .catch((err) => res.status(400).json("there is an error getting user"));
}
module.exports = {
    hundleProfile : hundleProfile
}