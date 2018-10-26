

//Simple version, without validation or sanitation
exports.google = (req, res) => {
  const user = { 
    name: req.user.displayName,
    photo: req.user.photo
  }
  res.send(user);
}



