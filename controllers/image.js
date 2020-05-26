const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "16a193340d4d44638530f35d0c143ec4",
  });
const hundleAPI = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => json.status(400).json("error working with API"))
}

const hundleImage = (req,res,db) =>{
    const { id } = req.body;
    db("users")
      .where({ id })
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => res.json(entries[0]))
      .catch((err) => res.status(400).json("there is an error getting entries"));
}
module.exports = {
    hundleImage,
    hundleAPI
}