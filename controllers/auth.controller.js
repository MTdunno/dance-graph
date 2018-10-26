

//Simple version, without validation or sanitation
exports.google = (req, res) => {
  const user = { 
    name: req.user.displayName,
    photo: req.user.image
  }
  res.json(user);
}



